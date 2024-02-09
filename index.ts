import puppeteer from 'puppeteer';
import { schedule } from 'node-cron';

interface CheckResult {
    errorCode: string;
    errorMessage: string;
    referenceId: string;
}

async function checkAvailability(postcode: string, houseNumber: number|string) {
    const browser = await puppeteer.launch({
        // this won't run on in docker on mac
        executablePath: process.arch === 'arm64' ? undefined : '/usr/bin/google-chrome',
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.goto('https://www.vodafone.co.uk/broadband/availability-checker');
    await page.waitForSelector('#onetrust-accept-btn-handler')
        .then(async (el) => el!.click());
    await page.waitForSelector('#postcode')
        .then(async (el) => el!.type(postcode, { delay: 100 }));
    await page.click('#check-availability-submit');
    await page.waitForSelector('#address')
        .then(async (el) => el!.select(String(houseNumber)));
    await page.click('#getNewLine-radio');
    await page.focus('#address-line-form button:last-child');

    // click 'View broadband plans
    const btn = await page.$('.fSSKvU');
    await btn?.click();
    const result = await page.waitForResponse(
        response => response.url().includes('https://www.vodafone.co.uk') &&
                response.url().endsWith('set-selected-address')
    )
        .then(async response => await response.json() as CheckResult);

    await browser.close();

    return result.errorCode !== '8904';
}

const houseNumber = process.env.HOUSE_NUMBER!;
const postcode = process.env.POST_CODE!;
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL!;

const task = schedule(
    // every day at 8am and 8pm
    '0 8,20 * * *',
    () => {
        function reportResult(available: boolean) {
            if (!available) {
                // eslint-disable-next-line no-console
                console.log(`[${new Date().toLocaleString()}] Fiber is not available`);
                return;
            }

            void fetch(
                discordWebhookUrl,
                {
                    method: 'POST',
                    headers: {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: 'Fiber is available *(Don\'t forget to delete docker container!)*',
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        avatar_url: 'https://assets.vodafone.co.uk/cs/groups/configfiles/documents/' +
                            'document/vf-logo-large.png'
                    })
                }
                // eslint-disable-next-line promise/always-return
            ).then(() => {
                task.stop();
                process.exit(0);
            });
        }

        void checkAvailability(postcode, houseNumber).then(reportResult);
    },
    {
        name: 'check fiber',
        runOnInit: true,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
);

const pptr = require("puppeteer");

const _url = "https://www.instagram.com/";
const profile = {
    user: 'jhoff.exe',
    pass: 'Ashisawesome1!',
    followers: 0,
    following: 0,
};

(async () => {
    try {
        // creates a new browser instance:
        const browser = await pptr.launch({ headless: false });

        // create a page inside the new browser instance:
        const page = await browser.newPage();

        // set viewport of the webpage:
        await page.setViewport({   
            width: 1920,             
            height: 1080,            
        });                        

        // navigate to the specified website:
        await page.goto(_url, { waitUntil: 'networkidle2' });
        // await page.screenshot('./screenshot/screenshot.png');

        // let login = await page.evaluate(() => {
        //     document.getElementsByClassName('_2hvTZ pexuQ zyHYP');
        //     return queried.toString();
        // });

        await page.waitFor(3000);
        await page.type('input[type="text"]', profile.user);
        await page.type('input[type="password"]', profile.pass);
        await page.click('button[type="submit"]');
        await page.waitFor(3000);
        await page.click('button[type="button"]');
        await page.waitFor(5000);
        await page.click('div[class="mt3GC"]');
        await page.waitFor(5000);
        await page.click('div[class="_0v2O4 StX70"]');
        await page.waitFor(5000);
        // await page.click(`a[href="/${profile.user}/followers/"]`);
        let follow_data = await page.evaluate((profile) => {
            let followers = parseInt(document.querySelectorAll(`a[href="/${profile.user}/followers/"]`)[0].children[0].innerText);
            let following = parseInt(document.querySelectorAll(`a[href="/${profile.user}/following/"]`)[0].children[0].innerText);
            return [followers, following];
        }, profile);
        followers = follow_data[0];
        following = follow_data[1];
        console.log(follow_data);
        
        // await page.keyboard();
    }
    catch(e) {
        console.log(e.message);
    }
})();
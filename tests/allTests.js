const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;

describe('Full E-Commerce Flow', function() {
    this.timeout(300000); // 5 minutes for the whole flow + waits
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        driver.manage().setTimeouts({ implicit: 5000 });
        await driver.get('http://localhost:3000');
    });

    after(async function() {
        await driver.quit();
    });

    it('Home Page - Check title', async function() {
        const title = await driver.getTitle();
        assert.include(title, 'ProShop');
        console.log('Home page loaded ✔');
    });

    it('Search for iPhone', async function() {
        const searchBox = await driver.findElement(By.name('q'));
        await searchBox.sendKeys('iPhone');

        const searchBtn = await driver.findElement(By.css('button[type="submit"]'));
        await searchBtn.click();

        await driver.wait(until.elementLocated(
            By.xpath("//h3[contains(text(),'iPhone 13 Pro 256GB Memory')]")
        ), 10000);

        const productFound = await driver.findElement(
            By.xpath("//h3[contains(text(),'iPhone 13 Pro 256GB Memory')]")
        ).isDisplayed();

        assert.isTrue(productFound, 'iPhone 13 Pro shows up in search results');
        console.log('Search test ✔');
    });

    it('Add iPhone to cart', async function() {
        const addBtn = await driver.findElement(
            By.xpath("//h3[contains(text(),'iPhone 13 Pro 256GB Memory')]/following::button[text()='Add to Cart']")
        );
        await addBtn.click();

        const cartLink = await driver.findElement(By.id('cart-link'));
        await cartLink.click();

        await driver.wait(until.elementLocated(
            By.xpath("//td[contains(text(),'iPhone 13 Pro 256GB Memory')]")
        ), 10000);

        const inCart = await driver.findElement(
            By.xpath("//td[contains(text(),'iPhone 13 Pro 256GB Memory')]")
        ).isDisplayed();

        assert.isTrue(inCart, 'iPhone successfully added to cart');
        console.log('Add to cart test ✔');
    });

    it('Navigate to checkout page', async function() {
        const checkoutBtn = await driver.findElement(By.id('checkout-btn'));
        await checkoutBtn.click();

        await driver.wait(async () => (await driver.getCurrentUrl()).includes('shipping'), 10000);
        const url = await driver.getCurrentUrl();
        assert.include(url, 'shipping', 'Navigated to checkout page');
        console.log('Checkout navigation test ✔');
    });

    it('Keep browser open for demo', async function() {
        console.log('Browser will stay open for 60 seconds for visual demo...');
        await new Promise(resolve => setTimeout(resolve, 60000)); // 60s wait
    });
});
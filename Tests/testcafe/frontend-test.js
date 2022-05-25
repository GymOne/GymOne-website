import { Selector } from "testcafe";

const APP_BASE_URL = "http://185.51.76.122:8090";

let email = "Tester90@gmail.com";
let password = "Tester90";

fixture("Register");
test.page(`${APP_BASE_URL}/auth/log-reg`)("Register an account", async (t) => {
  await t
    .click("#signUp")
    .typeText("#container", email)
    .typeText(
      "#container > div.form-container.sign-up-container > form > input:nth-child(5)",
      email
    )
    .typeText(
      "#container > div.form-container.sign-up-container > form > input:nth-child(6)",
      password
    )
    .click("#container > div.form-container.sign-up-container > form > button");
});

fixture("Login");
test.page(`${APP_BASE_URL}/auth/log-reg`)("Login", async (t) => {
  await t
    .typeText(
      "#container > div.form-container.sign-in-container > form > input:nth-child(4)",
      email
    )
    .typeText(
      "#container > div.form-container.sign-in-container > form > input:nth-child(5)",
      password
    )
    .click("#container > div.form-container.sign-in-container > form > button")
    .expect(
      Selector("body > app-root > app-header > div > div > a.pointer").innerText
    )
    .eql("Logout");
});

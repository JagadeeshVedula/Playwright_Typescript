import { test, expect } from '../src/fixtures/baseFixtures';
import { loginPage } from '../src/pages';

const username = "user1994@gmail.com"
const password = "Yuvraj@12"
test.describe('login', ()=>{
  test("login",async({login})=>{
    await login.login_to_the_Application("/",username,password)
  }
  )
})


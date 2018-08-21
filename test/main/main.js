module.exports = {
    ' Test Start': (browser) => {

        browser
            .url(browser.globals.url_index)
            .waitForElementPresent('html', 5000, 'backend page ok')
            .getTitle(function (title) { // 取得網頁標題
                this.assert.equal(typeof title, 'string'); // 確認取得的資料型別是否為字串
                this.assert.equal(title, ':: Bualuang iBanking ::');  // 確認內容是否為"Bualuang iBanking"
            })
            .waitForElementVisible('input[name="txtID"]', 'username ok')
            .waitForElementVisible('input[name="txtPwd"]', 'password ok')
    },
    'Login': (browser) => {
        const test = '1';
        browser
            .perform(function () {
                browser
                    .pause(2000)
                    .clearValue('input[name="txtID"]')//輸入錯誤內容
                    .clearValue('input[name="txtPwd"]')//輸入錯誤內容
                    .setValue('input[name="txtID"]', ' ')//input 帳號
                    .setValue('input[name="txtPwd"]', '')//input 密碼
                    .pause(2000)
                    .click('#btnLogOn')
                    .pause(2000)
                    .getTitle(function (title) { // 取得網頁標題
                        this.assert.equal(typeof title, 'string'); // 確認取得的資料型別是否為字串
                        this.assert.equal(title, ':: Bualuang iBanking ::');  
                    })

                    .getText("#ctl00_ctl00_C_CW_gvDepositAccts_ctl02_lblAcctBal", function(result) {
                        const test3 = result.value;
                        console.log(`Ledger Balance:${test3}`)
                    })//餘額

                    .click('#lnkTransfers')
                    .pause(5000)
                    .click('#ctl00_ctl00_C_CW_ddlFromAccountList > optgroup > option')
                    .pause(5000)
                    .click('')//設定轉帳銀行
                    .verify.containsText('#ctl00_ctl00_C_CW_ddlToAccountList', process.env.account, 'Check ok')

                    .setValue('input[name="ctl00$ctl00$C$CW$txtAmount"]', process.env.AMOUNT || 1)//Transfer amount


                    .getValue("#ctl00_ctl00_C_CW_txtAmount", function(result) {
                        const test2 = result.value;
                        console.log(`Transfer amount:${test2}`)
                    })
                    
                    .click('#ctl00_ctl00_C_CW_btnNext')
                    .pause(5000)
                    
                    .click('#ctl00_ctl00_C_CW_btnConfirm',function(){
                        browser.saveScreenshot(`./reports/search-result${test}.png`)
                    })
                    .pause(3000)
                    
                   
                    .end()
            })



    }

}


import React, { useState } from "react";
import styles from "./faq.module.scss";
import Icon from "Components/Icons";

function Merchant(props: any) {
  const [clicked, setClicked] = useState<any>(0);

  const toggle = (index: any) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };
  return (
    <div className={styles.mainContentWrapper}>
      <div className={styles.contentWrapper}>
        {/**Content 1 */}
        <div className={styles.content} onClick={() => toggle(0)}>
          <div className={styles.titleWrapperWhite}>
            <p className={clicked === 0 ? styles.redTitle : styles.title}>
              Who is qualified to be a merchant on KongaPay?
            </p>
            <div className={styles.arrow}>
              {clicked === 0 ? (
                <Icon name="arrow-down" />
              ) : (
                <Icon name="arrowRight" />
              )}
            </div>
          </div>
          {clicked === 0 ? (
            <div className={styles.dropdown}>
              <p>
                Kongapay is a financial service provider committed to providing
                the fastest, easiest, and most reliable mode of payment. It is a
                subsidiary of Nigeria’s leading E-commerce group - Konga.
                Millions of users around the globe rely on KongaPay to transfer
                and receive funds, purchase airtime and data, subscribe to cable
                TV, electricity bills, and more with lots of perks and bonuses.
              </p>
            </div>
          ) : null}
        </div>
        {/**Content 2 */}
        <div className={styles.content} onClick={() => toggle(1)}>
          <div className={styles.titleWrapperWhite}>
            <div>
              <p className={clicked === 1 ? styles.redTitle : styles.title}>
                What do I need to be setup as a Merchant?
              </p>
            </div>
            <div className={styles.arrow}>
              {clicked === 1 ? (
                <Icon name="arrow-down" />
              ) : (
                <Icon name="arrowRight" />
              )}
            </div>
          </div>
          {clicked === 1 ? (
            <div className={styles.dropdown}>
              <ul>
                <li>
                  Business Name, Address and RC registration – Who are you?
                </li>
                <li>
                  Scanned documents of signatories (Memorandum of Article, CO2,
                  CO7 and CAC) – Registered to run a business?
                </li>
                <li>Phone number (Verified with One Time Password)</li>
                <li>
                  IDs and BVN of signatories – A simple validation exercise
                  Business Bank Account – Where to settle your proceeds.
                </li>
                <li>Passport Pictures of the Signatories</li>
              </ul>
            </div>
          ) : null}
        </div>
        {/**Content 3 */}
        <div className={styles.content} onClick={() => toggle(2)}>
          <div className={styles.titleWrapperWhite}>
            <div>
              <p className={clicked === 2 ? styles.redTitle : styles.title}>
                What next once I have been setup as a Merchant?
              </p>
            </div>
            <div className={styles.arrow}>
              {clicked === 2 ? (
                <Icon name="arrow-down" />
              ) : (
                <Icon name="arrowRight" />
              )}
            </div>
          </div>
          {clicked === 2 ? (
            <div className={styles.dropdown}>
              <p className={styles.textTop}>
                You will be provided with Live Credentials, which include a
                Merchant ID, Login and Password to the KongaPay Merchant Admin
                Portal.
              </p>
              <p className={styles.textTop}>
                How do I view the transactions for my store?
              </p>
              <ul>
                <li>Login in using your Email Address and Password</li>
                <li>Click on Transactions Tab</li>
                <li>View Transactions</li>
              </ul>
            </div>
          ) : null}
        </div>
        {/**Content 4 */}
        <div className={styles.content} onClick={() => toggle(3)}>
          <div className={styles.titleWrapperWhite}>
            <p className={clicked === 3 ? styles.redTitle : styles.title}>
              If I have sub stores, will I be able to view the transactions for
              all my stores from one view?
            </p>
            <div className={styles.arrow}>
              {clicked === 3 ? (
                <Icon name="arrow-down" />
              ) : (
                <Icon name="arrowRight" />
              )}
            </div>
          </div>
          {clicked === 3 ? (
            <div className={styles.dropdown}>
              <p className={styles.textTop}>
                If you have multiple stores, then you will be able to view all
                the transactions from your sub stores from the main account
                under the transaction “tab”. The personnel for the main account
                would have to Log in using their email and password and click on
                transactions tab and then can filter based on stores or
                location.
              </p>
            </div>
          ) : null}
        </div>
        {/**Content 5 */}
        <div className={styles.content} onClick={() => toggle(4)}>
          <div className={styles.titleWrapperWhite}>
            <div>
              <p className={clicked === 4 ? styles.redTitle : styles.title}>
                How do I setup a Sub store?
              </p>
            </div>
            <div className={styles.arrow}>
              {clicked === 4 ? (
                <Icon name="arrow-down" />
              ) : (
                <Icon name="arrowRight" />
              )}
            </div>
          </div>

          {clicked === 4 ? (
            <div className={styles.dropdown}>
              <p className={styles.textTop}>
                You can setup a sub store by doing the following:
              </p>
              <ul>
                <li>
                  Click on TV subscription on the dashboard or select this from
                  “services” on your mobile app
                </li>
                <li>Select your preferred TV subscription (DSTV or GOTV)</li>
                <li>Key in your smartcard Number</li>
                <li>Choose your preferred bouquet</li>
                <li>
                  Since you want the payment to auto renew monthly, tick the box
                  for “Auto-renewal”
                </li>
                <li>
                  If you do not have a card information already, you will be
                  prompted to update your card info
                </li>
                <li>
                  You will be prompted to put in your pin and One Time Password
                  (OTP) which will be sent to you.
                </li>
              </ul>
            </div>
          ) : null}
        </div>

        {/**Content 6 */}
        <div className={styles.content} onClick={() => toggle(5)}>
          <div className={styles.titleWrapperWhite}>
            <p className={clicked === 5 ? styles.redTitle : styles.title}>
              What are the benefits of KongaPay for a Merchant?
            </p>
            <div className={styles.arrow}>
              {clicked === 5 ? (
                <Icon name="arrow-down" />
              ) : (
                <Icon name="arrowRight" />
              )}
            </div>
          </div>
          {clicked === 5 ? (
            <div className={styles.dropdown}>
              <ul>
                <li>Simple and Easy way of accepting payments.</li>
                <li>Fast and Easy Integration of SDKs and Web Plugin</li>
                <li>
                  Integrated machine learning based fraud prevention to help
                  minimize risks and chargebacks
                </li>
                <li>Seamless payment experience for your customers</li>
                <li>
                  Increase in revenue by allowing your customers setup recurring
                  payments
                </li>
                <li>
                  Robust Merchant Admin to view all your transaction reports and
                  track your revenue
                </li>
                <li>
                  Ability to do Bulk Payments to your staff from the Merchant
                  Admin Portal
                </li>
              </ul>
            </div>
          ) : null}
        </div>

        {/**Content 7 */}
        <div className={styles.content} onClick={() => toggle(6)}>
          <div className={styles.titleWrapperWhite}>
            <p className={clicked === 6 ? styles.redTitle : styles.title}>
              How do I collect Offline Payments as a merchant?
            </p>
            <div className={styles.arrow}>
              {clicked === 6 ? (
                <Icon name="arrow-down" />
              ) : (
                <Icon name="arrowRight" />
              )}
            </div>
          </div>
          {clicked === 6 ? (
            <div className={styles.dropdown}>
              <p className={styles.listWrapper}>
                You can accept payments offline using two approaches;
              </p>
              <ul>
                <li>
                  You can generate your QR code on your MPOS app, then present
                  it to your KongaPay customer to scan to pay.
                </li>
                <li>
                  You can also get your KongaPay customers to pay from their
                  KongaPay user app or web, by supplying your merchant ID or
                  merchant name and have your customers send money to your
                  KongaPay wallet, using “Pay” menu on their KongaPay app or
                  web.
                </li>
              </ul>

              <p className={styles.listWrapper}>
                You can also use the KongaPay MPOS app to accept payments; you
                will have to do the following:
              </p>
              <ul>
                <li>
                  Login to the KongaPay MPOS App with your merchant ID and Pin
                </li>
                <li>Enter Amount</li>
                <li>
                  Give customer the KongaPay MPOS device to input their KongaPay
                  Pin and One time password sent to their Telephone Number from
                  the Bank
                </li>
                <li>Click on ‘Pay’</li>
                <li>Merchant gets an alert of payment made immediately</li>
              </ul>
            </div>
          ) : null}
        </div>

        {/**Content 8 */}
        <div className={styles.content} onClick={() => toggle(7)}>
          <div className={styles.titleWrapperWhite}>
            <p className={clicked === 7 ? styles.redTitle : styles.title}>
              How long will it take for payment to reach the merchant?
            </p>
            <div className={styles.arrow}>
              {clicked === 7 ? (
                <Icon name="arrow-down" />
              ) : (
                <Icon name="arrowRight" />
              )}
            </div>
          </div>
          {clicked === 7 ? (
            <div className={styles.dropdown}>
              <p>
                The merchant gets an alert of payment made instantly. However,
                settlement to merchant is done at the end of the following day.
              </p>
            </div>
          ) : null}
        </div>

        {/**Content 9 */}
        <div className={styles.content} onClick={() => toggle(8)}>
          <div className={styles.titleWrapperWhite}>
            <p className={clicked === 8 ? styles.redTitle : styles.title}>
              How much is the transaction fees?
            </p>
            <div className={styles.arrow}>
              {clicked === 8 ? (
                <Icon name="arrow-down" />
              ) : (
                <Icon name="arrowRight" />
              )}
            </div>
          </div>
          {clicked === 8 ? (
            <div className={styles.dropdown}>
              <p>
                This depends on the merchant package type as the transaction
                fees differ. The minimum applicable transaction fees per package
                type are as shown below:
              </p>
              <ul>
                <li>Receive Payment = 1.5% and capped at ₦2,000.</li>
                <li>Bulk Payout = ₦50 per transaction.</li>
                <li>Digital Goods = 1% cash back commission.</li>
              </ul>
            </div>
          ) : null}
        </div>

        {/**Content 10 */}
        <div className={styles.content} onClick={() => toggle(9)}>
          <div className={styles.titleWrapperWhite}>
            <p className={clicked === 9 ? styles.redTitle : styles.title}>
              When does settlement happen?
            </p>
            <div className={styles.arrow}>
              {clicked === 9 ? (
                <Icon name="arrow-down" />
              ) : (
                <Icon name="arrowRight" />
              )}
            </div>
          </div>
          {clicked === 9 ? (
            <div className={styles.dropdown}>
              <p>Transfers are made on a 1day rolling (T+1).</p>
            </div>
          ) : null}
        </div>
        {/**Content 11 */}
        <div className={styles.content} onClick={() => toggle(10)}>
          <div className={styles.titleWrapperWhite}>
            <p className={clicked === 10 ? styles.redTitle : styles.title}>
              Are there other charges I should know of?
            </p>
            <div className={styles.arrow}>
              {clicked === 10 ? (
                <Icon name="arrow-down" />
              ) : (
                <Icon name="arrowRight" />
              )}
            </div>
          </div>
          {clicked === 10 ? (
            <div className={styles.dropdown}>
              No, there are no other fees except from those listed above. We
              never charge for setup or maintenance.
            </div>
          ) : null}
        </div>
        {/**Content 12 */}
        <div className={styles.content} onClick={() => toggle(11)}>
          <div className={styles.titleWrapperWhite}>
            <p className={clicked === 11 ? styles.redTitle : styles.title}>
              There seems to be a mismatch in your bank name:
            </p>
            <div className={styles.arrow}>
              {clicked === 11 ? (
                <Icon name="arrow-down" />
              ) : (
                <Icon name="arrowRight" />
              )}
            </div>
          </div>
          {clicked === 11 ? (
            <div className={styles.dropdown}>
              <p>
                While setting up your payout bank, you might come across this
                error. Not to worry as this is due to the difference in the name
                inputted on the KongaPay platform and the name currently on your
                ATM card or with your Bank.
              </p>
              <p>
                To have this rectified, provide a clear scanned copy of a valid
                means of Identification (National ID or Driver&apos;s license or
                International passport) bearing same name as it is on your
                banking details to support@kongapay.com.
              </p>
            </div>
          ) : null}
        </div>
        {/**Content 13 */}
        <div className={styles.content} onClick={() => toggle(12)}>
          <div className={styles.titleWrapperWhite}>
            <p className={clicked === 12 ? styles.redTitle : styles.title}>
              What if I forget my Login Details?
            </p>
            <div className={styles.arrow}>
              {clicked === 12 ? (
                <Icon name="arrow-down" />
              ) : (
                <Icon name="arrowRight" />
              )}
            </div>
          </div>
          {clicked === 12 ? (
            <div className={styles.dropdown}>
              <p>
                If you forget your Login details, you may use the reset PIN
                feature on your KongaPay platform or please contact 0708 063
                5700, 0809 460 5555 or send an email to support@kongapay.com.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default Merchant;

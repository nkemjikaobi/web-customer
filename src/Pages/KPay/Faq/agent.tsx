import React, { useState } from "react";
import styles from "./faq.module.scss";
import Icon from "Components/Icons";

function Agent(props: any) {
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
              What is KongaPay?
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
                KongaPay is a way to pay and get paid for things. At first, it
                was built for Konga.com. People loved using it so much that
                Konga decided to share the love and make it available even
                outside the Konga.com platform.
              </p>
            </div>
          ) : null}
        </div>
        {/**Content 2 */}
        <div className={styles.content} onClick={() => toggle(1)}>
          <div className={styles.titleWrapperWhite}>
            <div>
              <p className={clicked === 1 ? styles.redTitle : styles.title}>
                How to register on KongaPay
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
              <p>
                Registration on KongaPay is just as easy as transacting. Because
                we understand the peculiarities of our customers, we have
                reviewed our registration process to be simpler and customers
                can operate on different levels. The requirements levels are
                broken down as follows;
              </p>

              <p className={styles.textTop}>KongaPay Lite:</p>
              <ul>
                <li>Name</li>
                <li>Email Address</li>
                <li>Phone number (Verified with One Time Password)</li>
                <li>Date of Birth</li>
                <li>Gender</li>
                <li>Home Address</li>
              </ul>
              <p className={styles.textTop}>KongaPay Classic:</p>
              <ul>
                <li>Name</li>
                <li>Email Address</li>
                <li>Phone number (Verified with One Time Password)</li>
                <li>Date of Birth</li>
                <li>Gender</li>
                <li>Home Address</li>
                <li>Image Upload</li>
                <li>BVN</li>
                <li>Valid Means of Identification</li>
              </ul>
              <p className={styles.textTop}>KongaPay Classic:</p>
              <ul>
                <li>Name</li>
                <li>Email Address</li>
                <li>Phone number (Verified with One Time Password)</li>
                <li>Date of Birth</li>
                <li>Gender</li>
                <li>Home Address</li>
                <li>Image Upload</li>
                <li>BVN</li>
                <li>Valid Means of Identification</li>
                <li>Address Verification</li>
              </ul>
              <p>
                To get started, simply follow the steps below; First, download
                the app on the Google play or App store. If you do not own an
                Android or Apple device, you can still sign up by visiting the
                website, kongapay.com to sign up.
              </p>
            </div>
          ) : null}
        </div>
        {/**Content 3 */}
        <div className={styles.content} onClick={() => toggle(2)}>
          <div className={styles.titleWrapperWhite}>
            <div>
              <p className={clicked === 2 ? styles.redTitle : styles.title}>
                How do I link my Bank Card?
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
                To link your cards, please follow the steps below:
              </p>
              <ul>
                <li>
                  Login to your KongaPay account with your unique 4 digit
                  security PIN and Telephone Number.
                </li>
                <li>
                  Link your VISA/MasterCard to your KongaPay account by adding
                  your card details from the settings page.
                </li>
                <li>
                  You will need to input your KongaPay Pin and a One Time
                  Password (OTP) sent to your telephone to complete linking your
                  card to your KongaPay account.
                </li>
                <li>
                  To ensure the card belongs to you, we will make a small charge
                  (₦50 – ₦300) to your card and this will appear in your bank
                  statement or transaction alert shortly.
                </li>
                <li>
                  Once you have the checked the amount from your bank statement,
                  you will need to enter the amount in the settings page to
                  complete verification of your card.
                </li>
                <li>
                  Once you have the checked the amount from your bank statement,
                  you will need to enter the amount in the settings page to
                  complete verification of your card.
                </li>
                <li>
                  Note that it sometimes takes a few days before the charged
                  amount appears in your statement or before your bank sends you
                  a transaction alert.
                </li>
                <li>
                  Please also note that prior to your card being verified, you
                  will be limited to ₦20,000 for purchases only.
                </li>
              </ul>
            </div>
          ) : null}
        </div>
        {/**Content 4 */}
        <div className={styles.content} onClick={() => toggle(3)}>
          <div className={styles.titleWrapperWhite}>
            <p className={clicked === 3 ? styles.redTitle : styles.title}>
              Why am I being prompted to add my banking details as a KongaPay
              Classic user?
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
                If you try to complete a transaction and you do not have funds
                in your wallet (your wallet can be funded by another KongaPay
                user – irrespective of level) you will be required to link your
                bank account to your KongaPay account to complete your
                transaction. To link your bank account details to KongaPay, log
                into our App or website, navigate to settings, select Add Bank
                or Card and fill out the necessary fields, it’s easy and quick.
              </p>
            </div>
          ) : null}
        </div>
        {/**Content 5 */}
        <div className={styles.content} onClick={() => toggle(4)}>
          <div className={styles.titleWrapperWhite}>
            <div>
              <p className={clicked === 4 ? styles.redTitle : styles.title}>
                Can I set up auto-renewal for my TV Subscription?
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
                Yes you can and quite simply too, just follow these simple
                steps:
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
                  You will be prompted to put in your pin and OTP (One Time
                  Password)
                </li>
              </ul>
            </div>
          ) : null}
        </div>

        {/**Content 6 */}
        <div className={styles.content} onClick={() => toggle(5)}>
          <div className={styles.titleWrapperWhite}>
            <p className={clicked === 5 ? styles.redTitle : styles.title}>
              What’s the guarantee that my bank information will be safe if I
              give it to KongaPay?
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
              <p>
                We take no prisoners when it comes to the security of your
                information. First of all, you are always in control. No debit
                can occur on your account without you first authorising it with
                the KongaPay PIN and verification code sent by your bank to your
                phone or email. It’s like having two keys on the door to your
                account. Secondly, we don’t store your sensitive payment
                information. We simply verify what you provide against your
                bank’s database. So, when you forget your PIN, we need proof
                that it is indeed you making the request. The fastest way to do
                this is to have you re-verify the information you entered when
                you signed up. Finally, KongaPay is a regulated mobile money
                operator and are required by the Central Bank of Nigeria to
                maintain the same security standards you’ve come to trust with
                your bank.
              </p>
            </div>
          ) : null}
        </div>

        {/**Content 7 */}
        <div className={styles.content} onClick={() => toggle(6)}>
          <div className={styles.titleWrapperWhite}>
            <p className={clicked === 6 ? styles.redTitle : styles.title}>
              How secure is KongaPay?
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
              <p>
                KongaPay is safe and secure. We are in partnership with
                recognized banks in Nigeria. Also, the application has a
                two-factored authentication for linkage and is protected with a
                4 digit KongaPay PIN and a 6-digit one time Password for
                authentication. All these are in addition to other security
                measures that have been put in place to ensure that your
                transaction information is protected from intruders.
              </p>
            </div>
          ) : null}
        </div>

        {/**Content 8 */}
        <div className={styles.content} onClick={() => toggle(7)}>
          <div className={styles.titleWrapperWhite}>
            <p className={clicked === 7 ? styles.redTitle : styles.title}>
              How do I make a payment using KongaPay?
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
              <p className={styles.listWrapper}>To make a payment (online):</p>
              <ul>
                <li>Launch the KongaPay app or visit www.kongapay.com/login</li>
                <li>Login with your four-digit PIN and your mobile number</li>
                <li>Click on &apos;Pay&apos;</li>
                <li>
                  Scan the QR code or add the code or the merchant ID or enter
                  the merchants name in the name tab
                </li>
                <li>
                  Confirm transaction amount and authorize the transaction via
                  KongaPay 4digit Pin and One time password sent to your
                  telephone number from your Bank
                </li>
                <li>
                  Viola, your transaction is processed and your
                  Wallet/Account/Card will be debited with the transaction
                  amount.
                </li>
              </ul>
              <p className={styles.listWrapper}>Make payments (Offline):</p>
              <ul>
                <li>Merchant gives your their KongaPay MPOS device</li>
                <li>Confirm transaction amount</li>
                <li>
                  Authorize KongaPay Pin and One time password sent to your
                  phone from your Bank
                </li>
                <li>Click on &apos;Pay&apos;</li>
                <li>Account is debited with the transaction amount</li>
              </ul>
            </div>
          ) : null}
        </div>

        {/**Content 9 */}
        <div className={styles.content} onClick={() => toggle(8)}>
          <div className={styles.titleWrapperWhite}>
            <p className={clicked === 8 ? styles.redTitle : styles.title}>
              What happens if my phone is missing or stolen?
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
                In the event that you lose your phone, please call Our Contact
                Centre 0708 063 5700, 0809 460 5555 or send an email to
                support@kongapay.com authorizing us to block your account as
                soon as possible.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default Agent;

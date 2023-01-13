import React, { Fragment } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import styles from "./AboutUs.module.scss";
import { vision, values, ourBusinesses, teamMembers } from "./aboutUsData";
import { Link } from "react-router-dom";
import Icon from "Components/Icons";

const breadcrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/" },
  { Text: "About Us", Url: "/about-us" },
];

const mission = {
  icon: "dart",
  title: "Mission",
  text: "To be the Engine of Commerce & Trade in Africa.",
};

const visions = vision.map((item, i) => {
  return (
    <div className={styles.visionCard} key={i}>
      <Icon name={item.icon} />
      <h6>{item.title}</h6>
      <p>{item.text}</p>
    </div>
  );
});

const valuesList = values.map((item, i) => {
  return (
    <div className={styles.valuesCard} key={i}>
      <Icon name={item.icon} />
      <h6>{item.title}</h6>
      <p>{item.text}</p>
    </div>
  );
});

const otherBusinesses = ourBusinesses.map((item, i) => {
  return (
    <div className={styles.businessesCard} key={i}>
      <Icon name={item.icon} />
      <h6>{item.title}</h6>
      <p>{item.text}</p>
    </div>
  );
});

const team = teamMembers.map((item, i) => {
  return (
    <div className={styles.card} key={item.id}>
      <Link to={`/about-us/our-team/${item.id}`}>
        <img
          alt="A smiling man in suit and glasses"
          height="388px"
          loading="lazy"
          src={item.image}
          width="330px"
        />
      </Link>
      <div className={styles.cardText}>
        <div>
          <p className={styles.teamMemberName}>{item.name}</p>
          <p>{item.title}</p>
        </div>
      </div>
    </div>
  );
});

const AboutUs: React.FunctionComponent = () => {
  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadcrumb}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.container}>
          <section className={styles.about}>
            <h1>About Us</h1>
            <div className={styles.content}>
              <div className={styles.text}>
                <p>
                  Konga.com is Nigeria&apos;s largest online mall. We launched
                  July 2012 and our mission is to become the engine of commerce
                  and trade in Africa.
                </p>
                <br />
                <p>
                  We serve a retail customer base that continues to grow
                  exponentially, offering products that span various categories
                  including Phones, Computers, Clothing, Shoes, Home Appliances,
                  Books, healthcare, Baby Products, personal care and much more.{" "}
                </p>
                <br />
                <p>
                  Our range of services are designed to ensure optimum levels of
                  convenience and customer satisfaction with the retail process;
                  these services include our lowest price guarantee, 7-day free
                  return policy*, order delivery-tracking, dedicated customer
                  service support and many other premium services.
                </p>
                <br />
                <p>
                  As we continue to expand the mall, our scope of offerings will
                  increase in variety, simplicity and convenience; join us and
                  enjoy the increasing benefits.
                </p>
                <br />
                <p>
                  We are highly customer-centric and are committed towards
                  finding innovative ways of improving our customers&apos;
                  shopping experience with us; so give us some feedback on
                  help@konga.com. For any press related questions, kindly send
                  us an email at press@konga.com.
                </p>
                <br />
                <p>Thank you and we hope you enjoy your experience with us.</p>
              </div>
              <img
                alt="A work space"
                loading="lazy"
                src={
                  "https://res.cloudinary.com/staging-konga-com/image/upload/Rectangle_1422_2_rvjni6.png"
                }
              />
            </div>
          </section>
          <section className={styles.team}>
            <h1 className={styles.header}>Executive Team</h1>
            <div className={styles.members}>{team}</div>
          </section>
          <section className={styles.culture}>
            <div className={styles.cultureContainer}>
              <div className={styles.header}>
                <div>
                  <h1>Culture & Value</h1>
                  <div className={styles.holder}>
                    <Icon name="dart" />
                    <h4>{mission.title}</h4>
                    <p>{mission.text}</p>
                  </div>
                </div>
              </div>
              <div className={styles.vision}>
                <h1>Vision</h1>
                <div className={styles.visionList}>{visions}</div>
              </div>
              <div className={styles.values}>
                <h1>Values</h1>
                <div className={styles.valueList}>{valuesList}</div>
              </div>
            </div>
          </section>
          <section className={styles.otherBusinesses}>
            <h1>Our Other Businesses</h1>
            <div className={styles.businessesList}>{otherBusinesses}</div>
          </section>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default AboutUs;

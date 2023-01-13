/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import Input from "Components/Form/inputs/Input/Input";
import styles from "./step1.module.scss";
import { reformatDate } from "libs/utils/utils";
import { useForm } from "CustomHooks/FormHook";
import IAddressCountry from "dto/KongaOnline/IAddressCountry";
import { IPassenger } from "Models/FormModels/KTravel/BookingForm";
import ISearchForm from "Models/FormModels/KTravel/SearchForm";
import { connect } from "react-redux";
import AuthService from "Http/Services/AuthService";

interface IProps {
  currentStep: number;
  isGuest: boolean;
  onChange: Function;
  travel: any;
}
const data = ["Source Address", "Destination Address", "Finished"];

const step1: React.FunctionComponent<IProps> = (props: IProps) => {
  const initialForm: IPassenger = {
    FirstName: "",
    IsLeadPax: "1",
    Title: "1",
    PaxType: "1",
    LastName: "",
    Gender: "1",
    DateOfBirth: reformatDate(new Date()),
    PassportNumber: "",
    PassportExpiry: reformatDate(new Date()),
    passport_issuing_country: "",
    CountryCode: "Nigeria",
    CountryName: "NG",
    ContactNo: "",
    City: "",
    PinCode: "",
    AddressLine1: "",
    AddressLine2: "",
    Email: "",
  };
  const [travellersCount, setTravellersCount] = useState<{
    adults: number;
    children: number;
    infant: number;
    total: number;
  }>({ adults: 0, children: 0, infant: 0, total: 0 });
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setAuthenticatedUser(AuthService.GetLoggedInUser());
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const search: ISearchForm = props.travel;

    if (mounted && search) {
      setTravellersCount({
        adults: search.AdultCount,
        children: search.ChildCount,
        infant: search.InfantCount,
        total: search.AdultCount + search.ChildCount,
      });
    }
    return () => {
      mounted = false;
    };
  }, [props.travel]);

  const handleFormSubmit = () => {
    // console.log("form submitted");
  };

  const { Values, onChange, onSubmit } = useForm(handleFormSubmit, initialForm);

  const __checkForValidity = (): boolean => {
    let valid = Values.FirstName.trim().length > 0;
    valid = valid && Values.LastName.trim().length > 0;
    valid = valid && Values.PassportNumber.trim().length > 0;
    valid = valid && Values.passport_issuing_country.trim().length > 0;
    valid = valid && Values.ContactNo.trim().length > 0;
    valid = valid && Values.City.trim().length > 0;
    valid = valid && Values.PinCode.trim().length > 0;
    valid = valid && Values.AddressLine1.trim().length > 0;
    valid = valid && Values.Email.trim().length > 0;

    return valid;
  };

  useEffect(() => {
    let validity = __checkForValidity();
    props.onChange(Values, validity);
    return () => {
      validity = false;
    };
  }, [Values]);

  useEffect(() => {
    let counts: Array<IAddressCountry> = [];
    return () => {
      counts = [];
    };
  }, []);

  const loopComps = () => {
    return (
      <div>
        {Array.from(Array(travellersCount.adults), (e, i) => {
          return (
            <div key={i}>
              <div className={styles.travelerInfoForm_top}>
                <div className={styles.inputWrapper}>
                  <Input
                    label="First Name"
                    name={"FirstName"}
                    onChange={onChange}
                    type="text"
                    value={Values.FirstName}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <Input
                    label="Middle Name"
                    name={"MiddleName"}
                    onChange={onChange}
                    type="text"
                    value={Values.MiddleName}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <Input
                    label="Last Name"
                    name={"LastName"}
                    onChange={onChange}
                    type="text"
                    value={Values.LastName}
                  />
                </div>
              </div>
              <div className={styles.travelerInfoForm_top}>
                <div className={styles.inputWrapper}>
                  <Input
                    label={"Date Of Birth"}
                    name={"DateOfBirth"}
                    onChange={onChange}
                    placeholder={"Enter Date Of Birth"}
                    type="date"
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <Input
                    label="FF Number"
                    name={"FFNumber"}
                    onChange={onChange}
                    type="text"
                    value={Values.PassportNumber}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <Input
                    label="Prefix"
                    name={"Prefix"}
                    onChange={onChange}
                    type="text"
                    value={Values.Prefix}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Fragment>
      {authenticatedUser === null && !props.isGuest ? (
        <form onSubmit={onSubmit}>
          <div className={styles.travelerInfoForm}>
            <div className={styles.contactInformation}>
              <h1 className={styles.title}>Sign In now to Book Online</h1>
              <div className={styles.travelerInfoForm_top}>
                <div className={styles.inputWrapper}>
                  <Input
                    label={"Email Address"}
                    name={"Email"}
                    onChange={onChange}
                    type="email"
                    value={Values.Email}
                  />
                  <p className={styles.info}>
                    Your booking details will be sent to this email address.
                  </p>
                </div>
                <div className={styles.inputWrapper}>
                  <Input
                    label={"Telephone Number"}
                    name={"ContactNo"}
                    onChange={onChange}
                    type="tel"
                    value={Values.ContactNo}
                  />
                  <p className={styles.info}>
                    Your mobile number will be used only to send flight related
                    communications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={onSubmit}>
          <div className={styles.travelerInfoForm}>
            <div className={styles.travellersBreakdown}>
              <h1 className={styles.title}>Traveller’s Informations</h1>
              {loopComps()}
              <p className={styles.info}>
                Most countries require travelers to have a passport valid for
                more than 3 to 6 months from the date of entry into or exit from
                the country. Please check the exact rules for your destination
                country before completing the booking.
              </p>
            </div>
            <div className={styles.contactInformation}>
              <h1 className={styles.title}>Contact Information</h1>
              <div className={styles.travelerInfoForm_top}>
                <div className={styles.inputWrapper}>
                  <Input
                    label={"Email Address"}
                    name={"Email"}
                    onChange={onChange}
                    type="email"
                    value={Values.Email}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <Input
                    label={"Telephone Number"}
                    name={"ContactNo"}
                    onChange={onChange}
                    type="tel"
                    value={Values.ContactNo}
                  />
                </div>
              </div>
              <p className={styles.info}>
                Your mobile number will be used only to send flight related
                communications.
              </p>
            </div>
          </div>
          <div className={styles.policy}>
            <p>
              By booking this item, you agree to pay the total amount shown,
              which includes Service Fees, on the right and to the Booking
              <span>Terms and Conditions</span> and <span>Privacy Policy</span>
            </p>
          </div>
        </form>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({ travel: state.travel.SearchedData });
export default connect(mapStateToProps, {})(step1);

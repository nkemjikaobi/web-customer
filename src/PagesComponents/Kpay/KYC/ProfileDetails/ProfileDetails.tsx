import React, { useEffect, useState } from "react";
import Icon from "Components/Icons";
import IUser from "dto/Authentication/IUser";
import { composeClasses, isObjectEmpty, handleResize } from "libs/utils/utils";
import { connect } from "react-redux";
import styles from "./ProfileDetails.module.scss";
import IPerson from "dto/Authentication/IPerson";
import UserService from "Http/Services/UserService";
import IDocumentValue from "dto/Authentication/IDocumentValue";
import IPersonWallet from "dto/Authentication/IPersonWallet";
import IdVerification from "./IdVerifcation";
import BankVerification from "./BankVerification";
import AddressVerification from "./AddressVerification";
import UpgradeKyc from "./UpgradeKyc";
import ProfileDetailSkeleton from "./ProfileDetailsSkeleton";
import defaultdp from "Assets/images/png/defaultdp.png";
import EmptyState from "./EmptyState/EmptyState";
interface IProfileDetails {
  user?: IUser;
}

const ProfileDetails: React.FunctionComponent<IProfileDetails> = (
  props: IProfileDetails
) => {
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [uploadProfilePic, setUploadProfilePic]: Array<any> = useState([]);
  const [uploadId, setUploadId]: Array<any> = useState([]);
  const [showIdDetails, setShowIdDetails] = useState<boolean>(false);
  const [showBankDetails, setShowBankDetails] = useState<boolean>(false);
  const [showAddressDetails, setShowAddressDetails] = useState<boolean>(false);
  const [personDetails, setPersonDetails] = useState<any>(null);
  const [governmentId, setGovernmentId] = useState<any>(null);
  const [bvnValue, setBvnValue] = useState("");
  const [bvn, setBvn] = useState<any>();
  const [idStatus, setIdStatus] = useState<any>(null);
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [kycLevel, setKycLevel] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [addressDetails, setAddressDetails]: Array<any> = useState([]);
  const [emptyState, setEmptyState] = useState<boolean>(false);

  let user = props.user;

  useEffect(() => {
    if (user) {
      const fName = [user.firstName ?? "", user.lastName ?? ""].join(" ");
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
      setFullName(fName);
      setEmail(user.emailAddress ?? "");
      setPhoneNumber(user.phoneNumber ?? "");
    }
    return () => {
      user = undefined;
    };
  }, []);

  let idDetails: any;
  let utilityBills: any;
  useEffect(() => {
    (async () => {
      setLoading(true);
      const person = await UserService.GetUserProfileFromKPay();
      if (!person) {
        setLoading(false);
        setEmptyState(true);
      }

      if (person) {
        setLoading(false);
        setPersonDetails(person);
        setKycLevel(parseInt(person.kyc_level));
        const personWallet = person.wallets.filter(
          (wallet: IPersonWallet) => wallet.wallet_type_name === "Standard"
        );

        if (personWallet && personWallet.length > 0) {
          setAccountNumber(`${personWallet[0].external_account_no}`);
        }

        const bvnNumber = personDetails && personDetails.bvn;
        setBvn(bvnNumber);
        const firstFour = bvnNumber && bvnNumber.slice(0, 4);
        const lastFour = bvnNumber && bvnNumber.slice(7, 11);
        setBvnValue(`${firstFour} **** ${lastFour}`);

        utilityBills = personDetails && personDetails.utility_bill;
        const utilityBillsObj = utilityBills && JSON.parse(utilityBills?.value);
        setAddressDetails(utilityBillsObj);

        idDetails = personDetails && personDetails.government_issued_id;
        const idDetailsObj = idDetails && JSON.parse(idDetails?.value);
        setGovernmentId(idDetailsObj);
        setIdStatus(idDetails);
      }
    })();
  }, [bvnValue]);

  useEffect(() => {
    if (user) {
      setFullName([user.firstName ?? "", user.lastName ?? ""].join(" "));
      setEmail(user.emailAddress ?? "");
      setPhoneNumber(user.phoneNumber ?? "");
    }
    return () => {
      user = undefined;
    };
  }, [props]);

  useEffect(() => {
    const names = fullName.split(" ");
    setFirstName([...names].length > 0 ? [...names][0] : "");
    setLastName(
      [...names].length > 1
        ? [...names].splice(1, names.length - 1).join(" ")
        : ""
    );
  }, [fullName]);

  const handleProfilePic = (event: any) => {
    const uploadFilesArray = Array.prototype.slice.call(event.target.files);
    uploadFilesArray.forEach((file) => {
      const fileUrl = window.URL.createObjectURL(file);
      const reader = new FileReader();
      const fileData = {
        fileUrl,
        name: file.name,
      };
      reader.readAsDataURL(file);
      handleResize(file, (resizedImage) => {
        setUploadProfilePic(URL.createObjectURL(resizedImage));
      });
    });
  };

  let kycIdStatusLabel = "";
  let kycStatusLabelStyle = "";
  if (!isObjectEmpty(personDetails)) {
    switch (true) {
      case idStatus && idStatus.status === "pending":
        kycIdStatusLabel = "Pending";
        kycStatusLabelStyle = styles.pending;
        break;
      case idStatus && idStatus.status === "verified":
        kycIdStatusLabel = "Verified";
        kycStatusLabelStyle = styles.verified;
        break;
      case idStatus && idStatus.status === "rejected":
        kycIdStatusLabel = "Rejected";
        kycStatusLabelStyle = styles.rejected;
        break;
      default: {
        kycIdStatusLabel = "Pending";
        kycStatusLabelStyle = styles.pending;
      }
    }
  }

  const handleShowIdDetails = () => {
    setShowIdDetails(!showIdDetails);
    setShowBankDetails(false);
    setShowAddressDetails(false);
  };
  const handleShowBankDetails = () => {
    setShowBankDetails(!showBankDetails);
    setShowAddressDetails(false);
    setShowIdDetails(false);
  };
  const handleShowAddressDetails = () => {
    setShowAddressDetails(!showAddressDetails);
    setShowIdDetails(false);
    setShowBankDetails(false);
  };

  const styleHolders = [
    styles.customerTier,
    styles.customerTier2,
    styles.customerTier3,
  ];

  return (
    <div
      className={composeClasses(
        styles.profileSettings_profileDetails,
        styles.padding
      )}
    >
      {loading && <ProfileDetailSkeleton kycLevel={kycLevel} />}
      {emptyState && <EmptyState />}
      {!loading && !emptyState && (
        <div>
          <h5>Profile Details</h5>
          <div className={styles.header}>
            <div className={styles.img}>
              <img
                alt="Profile image"
                src={
                  personDetails && personDetails.logo_url === null
                    ? defaultdp
                    : personDetails && personDetails.logo_url
                }
              />
              <div className={styles.icon}>
                <label htmlFor="icon">
                  <Icon name="camera" />
                </label>
                <input
                  id="icon"
                  onChange={(e) => handleProfilePic(e)}
                  type="file"
                />
              </div>
            </div>
            <p className={styles.accountNo}>A/C: {accountNumber}</p>
            <div className={styleHolders[kycLevel - 1]}>
              <p>{personDetails && personDetails.kyc_level_name}</p>{" "}
              <div className={styles.staricons}>
                {[...Array(kycLevel)].map((e, i) => {
                  return <Icon key={i} name="star2" />;
                })}
              </div>
            </div>
          </div>
          <form className={styles.profileDetailsForm}>
            <div className={styles.formGroup}>
              <label htmlFor={"fullName"}>Full Name</label>
              <input
                disabled
                id={"fullName"}
                name={"fullName"}
                onChange={(event: any) => setFullName(event.target.value)}
                type={"text"}
                value={fullName}
              />
              <div className={styles.userInfo}>
                <div className={styles.input}>
                  <label htmlFor={"email"}>Email Address</label>
                  <input
                    disabled
                    id={"email"}
                    name={"email"}
                    onChange={(event: any) => setEmail(event.target.value)}
                    type={"email"}
                    value={email}
                  />
                </div>

                <div className={styles.input}>
                  <label htmlFor={"phoneNumber"}>Phone Number:</label>
                  <input
                    disabled
                    id={"phoneNumber"}
                    maxLength={11}
                    minLength={9}
                    name={"phoneNumber"}
                    onChange={(event: any) =>
                      setPhoneNumber(event.target.value)
                    }
                    type={"number"}
                    value={phoneNumber}
                  />
                </div>
              </div>
            </div>
            <div className={styles.kycDetailsContainer}>
              <IdVerification
                governmentId={governmentId}
                handleShowIdDetails={handleShowIdDetails}
                kycIdStatusLabel={kycIdStatusLabel}
                kycStatusLabelStyle={kycStatusLabelStyle}
                showIdDetails={showIdDetails}
              />
              <BankVerification
                bvn={bvn}
                bvnValue={bvnValue}
                handleShowBankDetails={handleShowBankDetails}
                kycIdStatusLabel={kycIdStatusLabel}
                kycStatusLabelStyle={kycStatusLabelStyle}
                personDetails={personDetails}
                showBankDetails={showBankDetails}
              />
              <AddressVerification
                addressDetails={addressDetails}
                handleShowAddressDetails={handleShowAddressDetails}
                kycStatusLabelStyle={kycStatusLabelStyle}
                showAddressDetails={showAddressDetails}
              />
              <UpgradeKyc kycLevel={kycLevel} />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

ProfileDetails.defaultProps = {
  user: undefined,
};

const mapStateToProps = (state: any) => ({ user: state.auth.CurrentUser });

export default connect(mapStateToProps, {})(ProfileDetails);

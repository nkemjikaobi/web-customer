import React, { Fragment, useEffect, useState } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import FlightDetailsCard from "Components/TravelInfo/FlightDetailsCard/flightDetailsCard";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import Step1 from "Components/TravelInfo/Step1/step1";
import Step2 from "Components/TravelInfo/Step2/step2";
import Step3 from "Components/TravelInfo/Step3/step3";
import Step4 from "Components/TravelInfo/Step4/step4";
import Button from "Components/Button/button";
import Nav from "Components/TravelInfo/Nav/nav";
import styles from "./travelInfo.module.scss";
import { composeClasses, generateAppReference } from "libs/utils/utils";
import { connect } from "react-redux";
import { IJourney, IJourneyFare } from "dto/KongaTravel/ISearchResponse";
import { useHistory } from "react-router-dom";
import accounting from "accounting";
import { CURRENCIES } from "Helpers/Constants";
import PaymentMethodForm from "Models/ComponentModels/Travel/PaymentMethodForm";
import TravelService from "Http/Services/TravelService";
import IBookingForm, {
  IPassenger,
} from "Models/FormModels/KTravel/BookingForm";
import config from "Configurations/configurations";
import PaymentService from "Http/Services/PaymentService";
import IPayViaKongapaySdk from "dto/Cart/IPayViaKongapaySdk";
import { generateHash } from "libs/utils/hashing";
import AuthService from "Http/Services/AuthService";

const breadcrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/travel/booking" },
  { Text: "Flight", Url: "" },
  { Text: "Travelers Details" },
];

interface ITraveler {
  selectedFlight: IJourney;
  searchId: number;
}

const Traveler: React.FunctionComponent<ITraveler> = (
  properties: ITraveler
) => {
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fare, setFare] = useState<IJourneyFare>();
  const [canMove, setCanMove] = useState<boolean>(false);
  const [stepOneValues, setStepOneValues] = useState<IPassenger>();
  const [stepTwoValues, setStepTwoValues] = useState<any>();
  const [stepThreeValues, setStepThreeValues] = useState<PaymentMethodForm>();

  useEffect(() => {
    let selectedFlight: IJourney | undefined = properties.selectedFlight;
    try {
      if (!selectedFlight) {
        history.push("/travel/booking-result");
      } else {
        setFare(selectedFlight.fare[0]);
      }
    } catch (error: any) {}

    return () => {
      selectedFlight = undefined;
    };
  }, [properties.selectedFlight]);

  const handleCustomerDetailsEvent = (
    values: IPassenger,
    isValid: boolean
  ): boolean => {
    setCanMove(isValid);
    return true;
  };

  const handleAdditionalServicesEvent = (values: any): boolean => {
    setCanMove(true);
    return true;
  };

  const handlePaymentEvent = async (
    formValue: PaymentMethodForm
  ): Promise<boolean> => {
    const presentStep = currentStep + 1;

    setIsSubmitting(true);
    setCanMove(true);

    const flightForm: IBookingForm = {
      Passengers: [],
      AppReference: generateAppReference(),
      search_id: properties.searchId.toString(),
      token: properties.selectedFlight.token,
      token_key: properties.selectedFlight.token_key,
    };

    flightForm["Passengers"] = stepOneValues ? [stepOneValues] : [];

    const bookingResult = await TravelService.BookFlight(flightForm);
    if (bookingResult && stepOneValues) {
      const tempPerson: IPayViaKongapaySdk = {
        email: stepOneValues.Email,
        amount: properties.selectedFlight.price.api_total_display_fare,
        firstname: stepOneValues.FirstName,
        lastname: stepOneValues.LastName,
        phone: stepOneValues.ContactNo,
        reference: bookingResult.app_reference,
        hash: generateHash(
          bookingResult.app_reference,
          properties.selectedFlight.price.api_total_display_fare,
          config.sdk.kTravel.publicKey
        ),
        description: `Konga Travels Transaction for reference ${bookingResult.app_reference}`,
        merchantId: config.sdk.kTravel.merchantId,
        enableFrame: true,
        callback: "/payment/callback/app=1?origin=travel",
        customerId: stepOneValues.Email,
        mode: config.sdk.mode,
      };
      PaymentService.PayViaKongapaySdk(tempPerson);
    }

    setCanMove(false);
    setIsSubmitting(false);
    return true;
  };

  const _next = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    let presentStep = currentStep;
    switch (currentStep) {
      case 1:
        if (stepTwoValues) {
          presentStep += handleAdditionalServicesEvent(stepTwoValues) ? 1 : 0;
        }
        break;
      case 2:
        if (stepThreeValues) {
          handlePaymentEvent(stepThreeValues)
            .then((success: boolean) => {
              presentStep += success ? 1 : 0;
            })
            .catch((err: any) => console.log("[e] handlePaymentEvent: ", err));
        }
        break;
      case 0:
      default:
        if (stepOneValues) {
          presentStep += handleCustomerDetailsEvent(stepOneValues, true)
            ? 1
            : 0;
        }
        break;
    }
    setCurrentStep(presentStep);
    setCanMove(false);
    setIsSubmitting(false);
  };

  const authenticatedUser = AuthService.GetLoggedInUser();
  const [isGuest, setIsGuest] = useState<boolean>(false);

  const handleSetGuest = (isGuest: boolean) => {
    setIsGuest(isGuest);
  };

  const nextButton = () => {
    if (
      (authenticatedUser && currentStep < 3 && canMove) ||
      (currentStep > 0 && !authenticatedUser) ||
      isGuest
    ) {
      return (
        <div className={styles.button}>
          <Button
            btnClass={"btn-primary text-white"}
            handleClick={_next}
            isSubmitting={isSubmitting}
            title={"Continue"}
          />
        </div>
      );
    }
  };
  const loginButton = () => {
    if (currentStep === 0 && !authenticatedUser && !isGuest) {
      return (
        <div className={styles.button}>
          <Button
            btnClass={"btn-primary text-white"}
            handleClick={() => history.push("/login")}
            title={"Login to my account"}
          />
        </div>
      );
    }
  };
  const guestButton = () => {
    if (currentStep === 0 && !authenticatedUser && !isGuest) {
      return (
        <div className={styles.guestButton}>
          <Button
            btnClass={"btn-primary text-white"}
            handleClick={() => {
              handleSetGuest(true);
              _next;
            }}
            isSubmitting={isSubmitting}
            title={"Continue as guest"}
          />
        </div>
      );
    }
  };

  const submitButton = () => {
    if (currentStep === 3) {
      return (
        <div className={styles.button}>
          <Button
            btnClass={"btn-primary text-white"}
            handleClick={() => null}
            title="Finished"
          />
        </div>
      );
    }
    return null;
  };

  const formSteps = () => [
    {
      key: "step_1",
      component: (
        <>
          <Step1
            currentStep={currentStep}
            isGuest={isGuest}
            onChange={(formValue: IPassenger, validity: boolean) => {
              setStepOneValues(formValue);
              setCanMove(true);
            }}
          />
        </>
      ),
    },
    {
      key: "step_2",
      component: (
        <>
          <Step2
            currentStep={currentStep}
            onChange={(formValue: any) => {
              setStepTwoValues(formValue);
              setCanMove(true);
            }}
          />
        </>
      ),
    },
    {
      key: "step_3",
      component: (
        <>
          <Step3
            currentStep={currentStep}
            onChange={(formValue: PaymentMethodForm) => {
              setStepThreeValues(formValue);
              setCanMove(true);
            }}
          />
        </>
      ),
    },
    {
      key: "step_4",
      component: (
        <>
          <Step4 currentStep={currentStep} />
        </>
      ),
    },
  ];

  const formStepper = formSteps();

  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadcrumb}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.travelerInfo}>
          <div className={styles.header}>
            <Nav currentStep={currentStep} />
          </div>
          <div className={styles.travelInfo_content}>
            <div className={styles.left}>
              <div>
                <FlightDetailsCard />
              </div>
              <div className={styles.form_main}>
                <div>{formStepper[currentStep].component}</div>
                <div className={styles.directionalButtons}>
                  {loginButton()}
                  {guestButton()}
                  {nextButton()}
                  {submitButton()}
                </div>
              </div>
            </div>
            <div className={styles.rightTotal}>
              <div className={composeClasses(styles.info)}>
                <p>Base Fare</p>
                <p>
                  {accounting.formatMoney(
                    fare?.price_breakup.basic_fare ?? 0,
                    CURRENCIES.NAIRA
                  )}
                </p>
              </div>
              <div className={composeClasses(styles.info)}>
                <p>Taxes & Fees</p>
                <p>
                  {accounting.formatMoney(
                    fare?.total_breakup.api_total_tax ?? 0,
                    CURRENCIES.NAIRA
                  )}
                </p>
              </div>
              <div className={composeClasses(styles.info)}>
                <p>Services Fees & Taxes</p>
                <p>
                  {accounting.formatMoney(
                    fare?.price_breakup.service_tax ?? 0,
                    CURRENCIES.NAIRA
                  )}
                </p>
              </div>
              <div className={composeClasses(styles.info, styles.total)}>
                <p>TOTAL</p>
                <p>
                  {accounting.formatMoney(
                    fare?.api_total_display_fare ?? 0,
                    CURRENCIES.NAIRA
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  searchId: state.travel.SearchId,
  selectedFlight: state.travel.SelectedFlight,
});

export default connect(mapStateToProps, null)(Traveler);

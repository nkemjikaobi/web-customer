/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import styles from "./FoodDeliveryLocation.module.scss";
import { Select } from "Components/Form/inputs";
import IDeliveryState from "dto/KongaFood/IDeliveryState";
import IFoodDeliveryArea from "dto/KongaFood/IFoodDeliveryArea";
import IMerchantLocation from "dto/KongaFood/IMerchantLocation";
import FoodService from "Http/Services/FoodService";
import {
  SelectedLocationAction,
  MerchantByLocationAction,
  FoodStatesAction,
} from "Http/Redux/Actions/Food/FoodAction";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { composeClasses } from "libs/utils/utils";
import Icon from "Components/Icons";

interface IProps {
  DeliveryLocation?: IFoodDeliveryArea;
  SelectedLocationAction: Function;
  MerchantByLocationAction: Function;
  MerchantsByLocation?: Array<IMerchantLocation>;
  FoodStates: Array<IDeliveryState>;
  FoodStatesAction: Function;
  FoodAreas: Array<IFoodDeliveryArea>;
  FoodAreasAction?: Function;
  onLocationChange: Function;
}

const FoodDeliveryLocation: React.FunctionComponent<IProps> = ({
  DeliveryLocation,
  SelectedLocationAction,
  MerchantByLocationAction,
  FoodStates,
  FoodAreas,
  onLocationChange,
}) => {
  const [foodStates, setFoodStates] =
    useState<Array<IDeliveryState>>(FoodStates);
  const [foodAreas, setFoodAreas] =
    useState<Array<IFoodDeliveryArea>>(FoodAreas);
  const [newDeliveryLocation, setNewDeliveryLocation] =
    useState<IFoodDeliveryArea>(DeliveryLocation!);
  const [stateSelectValue, setStateSelectValue] = useState<any>(
    DeliveryLocation?.region_id
  );
  const [areaSelectValue, setAreaSelectValue] = useState<any>(
    DeliveryLocation?.area_id
  );
  const history = useHistory();

  const selectOptionsMapper = (
    options: any,
    labels: { text: string; value: string }
  ) => {
    if (options !== null) {
      return options.map((opt: any) => {
        return {
          text: opt[labels.text],
          value: opt[labels.value],
        };
      });
    }
  };

  const fetchFoodStates = async () => {
    if (foodStates === null) {
      const foodStateResponse: Array<IDeliveryState> =
        await FoodService.GetAllKongaFoodDeliveryStates();
      setFoodStates(foodStateResponse);
    }
  };

  const fetchFoodArea = async (e: any) => {
    e.preventDefault();
    setStateSelectValue(e.target.value);
    const foodAreaResponse = await FoodService.GetAllFoodDeliveryAreas(
      e.target.value
    );
    setFoodAreas(foodAreaResponse);
  };

  const setCustomerLocation = async (e: any) => {
    e.preventDefault();
    setAreaSelectValue(e.target.value);
    const deliveryLocation: IFoodDeliveryArea = foodAreas.find((area) => {
      return area.area_id.toString() === e.target.value.toString();
    })!;
    setNewDeliveryLocation(deliveryLocation);
  };

  const handleLocationChange = async () => {
    if (
      typeof newDeliveryLocation !== "undefined" &&
      typeof newDeliveryLocation.area !== "undefined"
    ) {
      const getMerchantsByLocation: Array<IMerchantLocation> =
        await FoodService.GetMerchantLocations(newDeliveryLocation.area);
      MerchantByLocationAction(getMerchantsByLocation);
      SelectedLocationAction(newDeliveryLocation);
      const area_slug =
        newDeliveryLocation?.area &&
        FoodService.areaToSlug(newDeliveryLocation?.area);
      history.push("/food/restaurants/" + area_slug);

      onLocationChange();
    }
  };

  useEffect(() => {
    let mounted = true;

    fetchFoodStates();
    fetchFoodArea;

    return () => {
      mounted = false;
    };
  }, [foodStates]);

  return (
    <div className={styles.deliveryLocation}>
      <div
        className={composeClasses(styles.mobileOnly, styles.close)}
        onClick={() => onLocationChange()}
      >
        <Icon name="closeBordered" />
      </div>
      <p className={composeClasses(styles.title, styles.mobileOnly)}>
        Delivering to
      </p>
      <Select
        onChange={(e: any) => fetchFoodArea(e)}
        options={selectOptionsMapper(foodStates, {
          text: "name",
          value: "region_id",
        })}
        placeholder="States"
        value={stateSelectValue}
      />
      <Select
        onChange={(e: any) => setCustomerLocation(e)}
        options={selectOptionsMapper(foodAreas, {
          text: "area",
          value: "area_id",
        })}
        placeholder="Area"
        value={areaSelectValue}
      />
      <div className={styles.changeDeliveryBtn}>
        <button
          className="btn w-100 text-white btn-primary"
          onClick={handleLocationChange}
        >
          Change
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  DeliveryLocation: state.food.SelectedLocation,
  MerchantsByLocation: state.food.MerchantsByLocation,
  FoodStates: state.food.FoodStates,
  FoodAreas: state.food.FoodAreas,
});

FoodDeliveryLocation.defaultProps = {
  DeliveryLocation: undefined,
  MerchantsByLocation: undefined,
  FoodAreasAction: undefined,
};

export default connect(mapStateToProps, {
  SelectedLocationAction,
  MerchantByLocationAction,
  FoodStatesAction,
})(FoodDeliveryLocation);

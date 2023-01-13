import ILocalGovernmentArea from "./ILocalGovernmentArea";

interface IState {
  id: number;
  name: string;
  region: string;
  state_code: string;
  lgas: Array<ILocalGovernmentArea>;
}

export default IState;

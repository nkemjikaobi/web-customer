interface ILocalGovernmentArea {
  id: number;
  name: string;
  state_id: number;
  latitude: number;
  longitude: number;
  category: string | null;
}

export default ILocalGovernmentArea;

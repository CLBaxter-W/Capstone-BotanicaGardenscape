import { useGetUserGardenQuery } from "../components_db/gardenSlice";

import Loading_Bar from "./Loading_Bar";
import { useSelector } from "react-redux";

export default function GardenPlants() {
  // Get the current User id
  const user_id = useSelector((state) => {
    return state.user.user.id;
  });
  //get plantList to display plant_name
  const plantList = useSelector((state) => {
    return state.reference.plantList;
  });
  //get current user's garden id
  const userGarden = useSelector((state) => {
    return state.garden.garden;
  });
  const garden_id = userGarden?.[0]?.id;
  const { data, isLoading, error } = useGetUserGardenQuery({
    user_id,
    garden_id,
  });
  console.log("UserGarden data", data);
  if (isLoading) {
    return Loading_Bar("50");
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No plants found.</div>;
  }
  const gardenPlantName = plantList
    ? plantList.filter((obj) => {
        if (obj.id === data?.plantInfo?.[0]?.plant_id) return obj;
      })
    : [{ plant_name: "no name yet" }];

  const displayPlantName = gardenPlantName[0]?.plant_name;

  function Plant_List() {
    return (
      <table className="table table-hover">
        <tbody>
          {data?.plantInfo?.map((plant) => {
            const random_number = Math.floor(Math.random() * 10);
            let img = "../src/assets/pictures/" + random_number + ".png";
            return (
              <tr className=" table-dark" key={plant.id}>
                <td scope="row" className="w30">
                  {displayPlantName}
                </td>
                <td className="w70">
                  <img src={img} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <>
      <div className=" border-dark bg-primary  card">
        {/* <div className="card-header ">Plants</div> */}

        <div className="table-responsive  ">
          {" "}
          <Plant_List />
        </div>
      </div>
    </>
  );
}

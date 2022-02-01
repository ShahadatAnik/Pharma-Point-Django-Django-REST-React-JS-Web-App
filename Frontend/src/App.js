import DrugsList from "./components/DrugsList";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";
import Form from "./components/Form";
import { useCookies } from "react-cookie";
import NavBar from "./components/NavBar";
import SelectedDrugListContext from "./components/SelectedDrugListContext";
import ShopDrugAmount from "./components/ShopDrugAmount";

function App() {
  const [drugs, setDrugs] = useState([]);
  const [editDrugs, seteditDrugs] = useState(null);
  const [token] = useCookies(["mytoken"]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pp/drugs/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setDrugs(resp))
      .catch((error) => console.log(error));
  }, []);

  const editBtn = (drug) => {
    seteditDrugs(drug);
  };

  const updatedInformation = (drug) => {
    const new_drugs = drugs.map((new_drug) => {
      if (new_drug.id === drug.id) {
        return drug;
      } else {
        return new_drug;
      }
    });

    setDrugs(new_drugs);
  };

  const drugForm = () => {
    seteditDrugs({
      name: "",
      scientificName: "",
      category: "",
      manufacturer: "",
      unitPrice: "",
      storageTemperature: "",
      dangerousLevel: "",
      storageLocation: "",
    });
  };

  const insertedInformation = (drug) => {
    const new_drug = [...drugs, drug];
    setDrugs(new_drug);
  };

  const deleteBtn = (drug) => {
    const new_drugs = drugs.filter((my_drug) => {
      if (my_drug.id === drug.id) {
        return false;
      }
      return true;
    });

    setDrugs(new_drugs);
  };

  return (
    <div>
      <NavBar />

      <DrugsList
        drugs={drugs}
        editBtn={editBtn}
        drugForm={drugForm}
        deleteBtn={deleteBtn}
      />
      {editDrugs ? (
        <Form
          drug={editDrugs}
          updatedInformation={updatedInformation}
          insertedInformation={insertedInformation}
        />
      ) : null}

      {/*if i remove the drugs=drugs it will work,
      but the page wont load beacuse i have a condition in DrugsList.js whhich
      is props.drugs && map */}
    </div>
  );
}

export default App;

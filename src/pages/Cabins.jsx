import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";
import Button from "../ui/Button";

function Cabins() {
  const [showAddCabin, setShowAddCabin] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Row>
        <Button
          size="medium"
          variation="primary"
          onClick={() => setShowAddCabin((showAddCabin) => !showAddCabin)}
        >
          Add Cabin
        </Button>
      </Row>
      {showAddCabin && (
        <Row>
          <CreateCabinForm />
        </Row>
      )}
    </>
  );
}

export default Cabins;

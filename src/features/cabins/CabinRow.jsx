import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 700;
  text-align: center;
  color: var(--color-green-700);
`;

const EditDev = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const {
    id,
    image: imageSrc,
    name,
    max_capacity: maxCapacity,
    regular_price: regularPrice,
    discount,
  } = cabin;

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("This Cabin deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
  });

  return (
    <>
      <TableRow>
        <Img src={imageSrc} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>${discount}</Discount>
        <EditDev>
          <button disabled={isDeleting} onClick={() => mutate(id)}>
            <HiOutlineTrash />
          </button>
          <button onClick={() => setShowForm((showForm) => !showForm)}>
            <HiOutlinePencilAlt />
          </button>
        </EditDev>
      </TableRow>
      <div>{showForm && <CreateCabinForm />}</div>
    </>
  );
}

export default CabinRow;

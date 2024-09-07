import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabin }) {
  const queryClient = useQueryClient();
  let enableEditting = false;

  if(cabin){
    enableEditting = true;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: enableEditting
      ? {
          id: cabin.id,
          name: cabin.name,
          regularPrice: cabin.regular_price,
          maxCapacity: cabin.max_capacity,
          image: cabin.image,
          discount: cabin.discount,
          description: cabin.description
        }
      : {},
  });

  // , mutate: createCabin

  const { isLoading, mutate: addOrEdit } = useMutation({
    mutationFn: (cabin) => addOrEditCabin(cabin),
    onSuccess: () => {
      toast.success("Your request submitted successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
  });

  const submitHandler = (data) => {
    console.log(data)
    addOrEdit(data)
  };

  const ErrorHandler = (err) => {
    console.log(err);
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler, ErrorHandler)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be atlease 1",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              getValues().regularPrice >= value ||
              "Discount shouldn't be less than 100",
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", cabin ? false : {
            required: "This field is required",
          })}
        />
        {errors?.image?.message && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => reset()}>
          reset
        </Button>
        <Button disabled={isLoading}>{cabin ? "Edit Cabin": "Add new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

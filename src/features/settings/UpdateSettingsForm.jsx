import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSetting } from "./useSetting";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    data: {
      max_booking_length: maxBookingLength,
      min_booking_length: minBookingLength,
      max_number_guests_per_booking: maxNumberGuestsPerBooking,
      breakfast_price: breakfastPrice,
    } = {},
  } = useSetting();
  const { isUpdating, mutate: updateSetting } = useUpdateSetting();

  const onBlurHandler = (e, field) => {
    console.log("blur")
    const { value } = e.target;
    updateSetting({[field]: value});
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          onBlur={(e) => onBlurHandler(e, "min_booking_length")}
          defaultValue={minBookingLength}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          onBlur={(e) => onBlurHandler(e, "max_booking_length")}
          defaultValue={maxBookingLength}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          onBlur={(e) => onBlurHandler(e, "max_number_guests_per_booking")}
          defaultValue={maxNumberGuestsPerBooking}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          onBlur={(e) => onBlurHandler(e, "breakfast_price")}
          defaultValue={breakfastPrice}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

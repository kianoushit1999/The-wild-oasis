import supabase from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("Cabins couldn't be loaded.");
  return cabins;
}

export async function addCabin(newCabin) {
  newCabin = {
    name: newCabin.name,
    discount: newCabin.discount,
    max_capacity: newCabin.maxCapacity,
    regular_price: newCabin.regularPrice,
    image: newCabin.image
  }

  console.log(newCabin)

  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();

  if (error) throw new Error("Cabins couldn't be loaded.");

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabins couldn't be loaded.");

  return data;
}

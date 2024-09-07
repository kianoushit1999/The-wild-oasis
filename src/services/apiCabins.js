import supabase from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("Cabins couldn't be loaded.");
  return cabins;
}

export async function addCabin(cabin) {
  const imageName = `${Math.random()}-${cabin.image.name}`
  const baseUrl = `https://vdoyhrhjeiyrolqzdipc.supabase.co/storage/v1/object/public/cabin_images/${imageName}`
  const newCabin = {
    name: cabin.name,
    discount: cabin.discount,
    max_capacity: cabin.maxCapacity,
    regular_price: cabin.regularPrice,
    image: baseUrl
  }

  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();

  if (error) throw new Error("This cabin couldn't be loaded.");

  const { error:storageErr } = await supabase
  .storage
  .from('cabin_images')
  .upload(`${imageName}`, cabin.image)

  if (storageErr) {
    await supabase.from("cabins").delete().eq("id", data.id);

    throw new Error("This cabin image couldn't be loaded.");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabins couldn't be loaded.");

  return data;
}

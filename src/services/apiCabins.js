import supabase from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if(error)
    throw new Error("Cabins couldn't be loaded.")
  return cabins
}

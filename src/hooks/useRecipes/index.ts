import type { Recipe } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAll = async (): Promise<Recipe[]> => {
    const response = await axios.get("/api/recipes");
    return response.data as Recipe[];
}

const useRecipes = () => {
    return useQuery(["recipes"], () => fetchAll());
};

export { useRecipes };
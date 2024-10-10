import { useState, useEffect } from "react";
import { GoogleGenerativeAI, HarmCategory } from "@google/generative-ai";

const useGeminiChat = () => {
  const apiKey = "AIzaSyCZnZEtxX0HlpoH7sWZhNKo49dm06zzSn4";
  const [chatSession, setChatSession] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [brandArr, setBrandsArr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [namePro, setNamePro] = useState(null);

  useEffect(() => {
    if (!apiKey) {
      setError("Missing GEMINI_API_KEY environment variable");
      return;
    }
    fetch("./data/name.json")
      .then((res) => res.json())
      .then((Data) => {
        setNamePro(Data);
      });
    fetch("./data/brand.json")
      .then((res) => res.json())
      .then((Data) => {
        setBrandsArr(Data);
      });
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        description:
          "Return ingredients. If the user gives any request like 'hi' or 'hey,' then give a greeting answer and not include the cart in the title. If at any time the user asks for a combo, then give all the names to make it, not just every dish as it is. (For example: if the user wants a combo of a burger and pizza, don't just give the dish name as ingredients; provide how to make the dish and give the proper list of minor to major ingredients for each single dish). Always include an emoji where required. I will give you 6,000 product names and the categories. Make sure you return the most relatable product from my data, and the most relevant data must be listed first, including quantities, brand, packet size, number quantity, and a summary for the requested recipe. If the recipe is mentioned, provide it; otherwise, mention the cart.",
        properties: {
          recipe: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description:
                  "and some time user demand the more dish than give all dishes respectively ingredients give name of the recipe according to user prompt like veg,non-veg,vegen Name of the recipe not found then do not mentioned if the recipe is not like veg,non-veg or vegan then simply return name of the related cart type or user prompt",
              },
              summary: {
                type: "string",
                description:
                  "A brief summary of the recipe or dish response and user input",
              },
              ingredients: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    ingredient_name: {
                      type: "string",
                      description: `Please don't give name like that Coca-Cola instead give me coca cola Name of the ingredient, if not specified, provide a popular brand i will give you the 6000 products do not use Cold Drink instead use soft drinks name do mean i want est match on top name array make sure if the possible than give me the name from the arr ${namePro}`,
                    },
                    brand: {
                      type: "string",
                      description: `Popular brand relating to the ingredient_name i giving you the name of every brand is ${brandArr} and fresh_vegetable and fresh_fruits are brand is Local Vendors (e.g., Coca-Cola, Pepsi for soft drinks)`,
                    },
                    quantity: {
                      type: "string",
                      description: "Quantity of the ingredient",
                    },
                    packet_size: {
                      type: "string",
                      description:
                        "Packet size available in the store (e.g., 500g, 1kg) always give in g, L, kg etc..",
                    },
                    NumberQuantity: {
                      type: "number",
                      description:
                        "Number of packets or items (e.g., 4 potatoes, 2 packs of Coca-Cola)",
                    },
                    ProCategory: {
                      type: "string",
                      description:
                        "give me the relative category as you thought that is my category from the database dry_fruits, masala, chocolates, chips, whole_spices, oil, instance_noodles, juices, rice, crunchies, nuts_makhana, milk_drink, coffee, cookies, other_dals, fresh_vegetable, herbs_seasoning, i_c_tub, soft_drinks, dark_chocolates, candies_gums, sticks, peanut_spread, poha, namkeens, tea, fresh_fruit, spread_dips, cheese, popcorn, green_herbal_tea, pickels_chutney, nachos, soda, ice_tea_cold_coffee, cakes_pels, cream_biscuits, korean_noodles, fruit_syrups, i_c_cup, sugar, asian_sauces, energy_bars, wafers_biscuit, oats, drink_mixture, bread, othe_sweets, ghee, salted_plain, batter, marle_digestive, enrgy_drinks, cooking_sauces, pastes, filter_coffee, salt, moong_dals, flakes, cones, tomato_ketchup, flour, olive_oil, panner_cream, cooking_pasta, i_c_sandwiches, toor_dals, bread, kids_cereals, hakka_noodles, chana_dals, yogurts, soup, i_c_kulfi, butter, cup_noodles, jaggery, kabuli_chana, instance_pasta, gulab_jamun, chocolate_spread, milk, choco_syrups, frozen_vegetable, laddoo, rusk_khari, pav, papad, kaju_katli, peda, rasgulla, chana, curd, burfi, jams, soan_papdi, vinegar_sauses give according to you other wise return defult ",
                    },
                    ingredientsDetail: {
                      type: "string",
                      description:
                        "give the detail of the summary of the ingredients give the detail of product might like what it is how use? ",
                    },
                    AverageColor: {
                      type: "string",
                      description: "give me the  color of that product make sure give perfect in hex color code"
                    }
                  },
                  required: [
                    "ingredient_name",
                    "brand",
                    "quantity",
                    "packet_size",
                    "NumberQuantity",
                    "ingredientsDetail",
                    "AverageColor"
                  ],
                },
              },
            },
            required: ["name", "summary", "ingredients"], // All fields are required
          },
        },
        required: ["recipe"], // Recipe object itself is required
      },
    };

    const newChatSession = model.startChat({ generationConfig });
    setChatSession(newChatSession);

    try {
      if (newChatSession.safetySettings) {
        newChatSession.safetySettings.setBlacklistedCategory(
          HarmCategory.PERSONAL_ATTACK
        );
        newChatSession.safetySettings.setBlacklistedCategory(
          HarmCategory.HATE_SPEECH
        );
      } else {
        console.warn("Safety settings are not available.");
      }
    } catch (error) {
      setError(`Error setting safety settings: ${error.message}`);
    }
  }, [apiKey]);

  const sendMessage = async (userInput) => {
    if (!chatSession) {
      setError("Chat session not yet initialized");
      return;
    }
    console.log(userInput);
    setIsLoading(true);

    try {
      const promptMessage = `I want you to create a shopping cart based on my request. Here's my dish request: ${userInput}. If the number of people is not specified, make it for 1 person. Please provide a list of ingredients and quantities in JSON format. dont give the food order link always make sure give the ingredient of the food`;

      const result = await chatSession.sendMessage(promptMessage);
      console.log("API Response:", result.response);

      const responseText =
        result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsedResponse = responseText ? JSON.parse(responseText) : null;

      setResponse(parsedResponse?.recipe);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, response, error, isLoading };
};

export default useGeminiChat;

import { useState, useEffect } from "react";
import { GoogleGenerativeAI, HarmCategory } from "@google/generative-ai";
import './GeminiData'
import GeminiData from "./GeminiData";

const useGeminiChat = () => {
  const apiKey = "AIzaSyCZnZEtxX0HlpoH7sWZhNKo49dm06zzSn4";
  const [chatSession, setChatSession] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!apiKey) {
      setError("Missing GEMINI_API_KEY environment variable");
      return;
    }
    
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
          "Return ingredients.if the any request include the incidents name and the with brand or any unit than give back both in respective felid (like request is the lays chips and amul cool than give the lays and cool in ingredient name and lays and amul give in the brand feild) if user request  If the user gives any request like 'hi' or 'hey,' then give a greeting answer and not include the cart in the title. If at any time the user asks for a combo, then give all the names to make it, not just every dish as it is. (For example: if the user wants a combo of a burger and pizza, don't just give the dish name as ingredients; provide how to make the dish and give the proper list of minor to major ingredients for each single dish). Always include an emoji where required. I will give you 6,000 product names and the categories. Make sure you return the most relatable product from my data, and the most relevant data must be listed first, including quantities, brand, packet size, number quantity, and a summary for the requested recipe. If the recipe is mentioned, provide it; otherwise, mention the cart.",
        properties: {
          recipe: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description:
                  "Emoji is required must include at end of the name and some time user demand the more dish than give all dishes respectively ingredients give name of the recipe according to user prompt like veg,non-veg,vegen Name of the recipe not found then do not mentioned if the recipe is not like veg,non-veg or vegan then simply return name of the related cart type or user prompt",
              },
              summary: {
                type: "string",
                description:
                  "Emoji is required with the in summary A brief summary of the recipe or dish response and user input",
              },
              userMessageDetail : {
                type: "string", 
                description: "Emoji is required Give a beautiful message for that cart generator message, like if they ask for any healthy cart, then replay like you are doing very well in life and you like the healthy and very conscious about your life, so we generate the best cart that helps your life, and if the user requests any dish or receipt, then give about a little bit of information and some praise about the recipe, and if any requests any dish or receipt, then give about a little bit of information and some praise about the recipe, and if any request is about a birthday, any party, or any other celebration type, then give a response according to it, and make sure to give also some emoji, and if any other cart, give a reply according to it."
              },
              ingredients: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    ingredient_name: {
                      type: "string",
                      description: `(strict warning don't include the brand name in this felid) sometime you gate the any brand name or any unit so don't give bake to me give name in single product like(not tomatoes give tomato, etc...)Please don't give name like that Coca-Cola instead give me coca cola Name of the ingredient, if not specified, provide a popular brand i will give you the 6000 products do not use Cold Drink instead use soft drinks name do mean i want est match on top name array make sure if the possible`,
                    },
                    brand: {
                      type: "string",
                      description: `Popular brand relating to the ingredient_name i giving you the name of every brand is ${GeminiData.brandArr} and fresh_vegetable and fresh_fruits are brand is Local Vendors (e.g., Coca-Cola, Pepsi for soft drinks)`,
                    },
                    quantity: {
                      type: "string",
                      description: "Quantity of the ingredient",
                    },
                    packet_size: {
                      type: "string",
                      description:
                        "Packet size available in the store (e.g., 500g, 1kg) always give in g, L, kg etc.. if not any get by default give various",
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
                        "specific give the why we suggest ans like that is help for good health or what is role in your recipe give the detail of the summary of the ingredients give the detail of product might like what it is how use? ",
                    }
                  },
                  required: [
                    "ingredient_name",
                    "brand",
                    "quantity",
                    "packet_size",
                    "NumberQuantity",
                    "ingredientsDetail"
                  ],
                },
              },
            },
            required: ["name", "summary", "ingredients","userMessageDetail"],
          },
        },
        required: ["recipe"],
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

    setIsLoading(true);

    try {
      const promptMessage = `I want you to create a shopping cart based on my request. Here's my dish request: ${userInput}. If the number of people is not specified, make it for 1 person. Please provide a list of ingredients and quantities in JSON format. Don't give the food order link. Always make sure to give the ingredient list for the food.`;

      const result = await chatSession.sendMessage(promptMessage);
      const responseText =
        result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      const parsedResponse = responseText ? JSON.parse(responseText) : null;
      setResponse(parsedResponse?.recipe);
    } catch (err) {
      setError(`Failed to generate cart: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, response, error, isLoading };
};

export default useGeminiChat;

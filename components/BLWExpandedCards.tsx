'use_client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Baby, 
  Utensils, 
  Clock, 
  BookOpen, 
  AlertTriangle, 
  Lightbulb, 
  Heart,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface BLWExpandedCardsProps {
  childAgeInMonths: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function BLWExpandedCards({ 
  childAgeInMonths, 
  isExpanded, 
  onToggle 
}: BLWExpandedCardsProps) {
  const isBLWReady = childAgeInMonths >= 6;

  const blwRecipes = [
    {
      name: "Avocado Sticks",
      age: "6+ months",
      ingredients: ["Avocado", "Lemon juice"],
      instructions: "Cut avocado into long strips, drizzle with lemon juice to prevent browning",
      tips: "Avocado should be soft but not overripe"
    },
    {
      name: "Banana Pancakes",
      age: "8+ months",
      ingredients: ["Banana", "Egg", "Oat flour"],
      instructions: "Mash banana, mix with egg and flour, fry on medium heat until golden brown",
      tips: "You can add a little cinnamon for flavor"
    },
    {
      name: "Steamed Broccoli",
      age: "6+ months",
      ingredients: ["Broccoli", "Olive oil"],
      instructions: "Steam broccoli until soft, drizzle with olive oil",
      tips: "Leave a long stem for easy gripping"
    },
    {
      name: "Egg Omelet",
      age: "8+ months",
      ingredients: ["Egg", "Milk", "Cheese"],
      instructions: "Beat egg with milk, fry in a pan, sprinkle with grated cheese",
      tips: "Cut into finger-sized pieces"
    }
  ];

  const blwSteps = [
    {
      step: 1,
      title: "Preparation",
      description: "Make sure your child can sit without support and shows interest in food",
      age: "6+ months"
    },
    {
      step: 2,
      title: "First Foods",
      description: "Start with soft foods the size of a finger: avocado, banana, sweet potato",
      age: "6-7 months"
    },
    {
      step: 3,
      title: "Expand Diet",
      description: "Gradually add new foods: vegetables, fruits, proteins",
      age: "7-9 months"
    },
    {
      step: 4,
      title: "Variety",
      description: "Offer different textures and tastes to develop food preferences",
      age: "9-12 months"
    }
  ];

  const blwFAQ = [
    {
      question: "My child doesn't eat, just plays with food. Is this normal?",
      answer: "Yes, this is absolutely normal! At the beginning of BLW, children explore food more than they eat. This is an important part of the learning process."
    },
    {
      question: "How much food should my child eat?",
      answer: "At ages 6-12 months, the main source of nutrition remains breast milk or formula. Solid food is complementary."
    },
    {
      question: "What to do if my child chokes?",
      answer: "Choking is normal during learning. The child learns to control food in their mouth. Always stay close during meals."
    },
    {
      question: "Can I combine BLW with purees?",
      answer: "Yes, you can! Many parents use a combined approach. The main thing is to follow safety principles."
    }
  ];

  if (!isBLWReady) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200"
      >
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Baby className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">BLW Recommendations</h3>
          <p className="text-gray-600">
            Your child is not yet 6 months old. BLW recommendations will be available when your child is ready for complementary feeding.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
    
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Utensils className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-bold text-gray-800">BLW - Baby Led Weaning</h2>
        </div>
        <button
          onClick={onToggle}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-xl"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide Recommendations
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Expand Recommendations
            </>
          )}
        </button>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Recipes Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-purple-500" />
                  <h3 className="text-xl font-semibold text-gray-800">BLW Recipes</h3>
                </div>
                <div className="space-y-4">
                  {blwRecipes.map((recipe, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">{recipe.name}</h4>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          {recipe.age}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-2">
                        <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                        <p><strong>Preparation:</strong> {recipe.instructions}</p>
                        <p><strong>Tip:</strong> {recipe.tips}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Guide */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-purple-500" />
                  <h3 className="text-xl font-semibold text-gray-800">Step-by-Step Implementation Plan</h3>
                </div>
                <div className="space-y-4">
                  {blwSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">{step.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">{step.description}</p>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          {step.age}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-purple-500" />
                                  <h3 className="text-xl font-semibold text-gray-800">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-4">
                {blwFAQ.map((faq, idx) => (
                  <div key={idx} className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{faq.question}</h4>
                    <p className="text-sm text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Reminder */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h4 className="font-semibold text-red-800">Important Safety Reminder</h4>
              </div>
              <p className="text-red-700 text-sm">
                Always stay close to your child during meals. BLW requires constant supervision. 
                Consult your pediatrician if you have any doubts.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 

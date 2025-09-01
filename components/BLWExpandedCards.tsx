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
      name: "ავოკადოს ჯოხები",
      age: "6+ თვე",
      ingredients: ["ავოკადო", "ლიმონის წვენი"],
      instructions: "ავოკადო დაჭერით ჯოხის ფორმის ნაჭრებად, გადააყარეთ ლიმონის წვენი მუქების თავიდან ასაცილებლად",
      tips: "ავოკადო უნდა იყოს რბილი მაგრამ არა გადამწიფებული"
    },
    {
      name: "ბანანის ფანქეიქები",
      age: "8+ თვე",
      ingredients: ["ბანანი", "კვერცხი", "ვაშლის ფქვილი"],
      instructions: "გაჭერით ბანანი, აურიეთ კვერცხთან და ფქვილთან, შემდეგ შეწვით საშუალო ცეცხლზე ოქროსფერი ფერის მიღებამდე",
      tips: "გემოსთვის შეგიძლიათ დაამატოთ ცოტა დარიჩინი"
    },
    {
      name: "პარული ბროკოლი",
      age: "6+ თვე",
      ingredients: ["ბროკოლი", "ზეითუნის ზეთი"],
      instructions: "აპარული ბროკოლი რბილებამდე, მორთვა ზეითუნის ზეთით",
      tips: "დატოვეთ გრძელი ყუნწი მოსაჭერად"
    },
    {
      name: "კვერცხის ომლეტი",
      age: "8+ თვე",
      ingredients: ["კვერცხი", "რძე", "ყველი"],
      instructions: "შეურიეთ კვერცხი რძესთან, შემდეგ შეწვით ტაფაზე, მორთვა გახეხილი ყველით",
      tips: "დაჭერით თითის ზომის ნაჭრებად"
    }
  ];

  const blwSteps = [
    {
      step: 1,
      title: "მომზადება",
      description: "დარწმუნდით, რომ ბავშვს შეუძლია დამოუკიდებლად დაჯდომა და ავლენს ინტერესს საკვების მიმართ",
      age: "6+ თვე"
    },
    {
      step: 2,
      title: "პირველი საკვები",
      description: "დაიწყეთ თითის ზომის რბილი საკვებით: ავოკადო, ბანანი, ტკბილი კარტოფილი",
      age: "6-7 თვე"
    },
    {
      step: 3,
      title: "დიეტის გაფართოება",
      description: "თანდათანობით დაამატეთ ახალი საკვები: ბოსტნეული, ხილი, ცილები",
      age: "7-9 თვე"
    },
    {
      step: 4,
      title: "მრავალფეროვნება",
      description: "შესთავაზეთ სხვადასხვა ტექსტურის და გემოს საკვები კვების პრეფერენციების გასავითარებლად",
      age: "9-12 თვე"
    }
  ];

  const blwFAQ = [
    {
      question: "ჩემი ბავშვი არ ჭამს, მხოლოდ თამაშობს საკვებით. ეს ნორმალურია?",
      answer: "დიახ, ეს აბსოლუტურად ნორმალურია! BLW-ს დასაწყისში ბავშები საკვებს უფრო სწავლობენ, ვიდრე ჭამენ. ეს სასწავლო პროცესის მნიშვნელოვანი ნაწილია."
    },
    {
      question: "რამდენი საკვები უნდა მიირთვას ჩემმა ბავშვმა?",
      answer: "6-12 თვის ასაკში ძირითადი საკვები რჩება დედის რძე ან ფორმულა. მყარი საკვები დამატებითია."
    },
    {
      question: "რა ვქნა, თუ ჩემი ბავშვი დაისხამტება?",
      answer: "სასწავლო პროცესში დახრჩობის ეპიზოდები ნორმალურია. ბავშვი სწავლობს საკვების კონტროლს პირში. ყოველთვის იყავით მათთან ახლოს კვებისას."
    },
    {
      question: "შემიძლია BLW შევაერთო პიურესთან?",
      answer: "დიახ, შეგიძლიათ! ბევრი მშობელი იყენებს შერეულ მიდგომას. მთავარია უსაფრთხოების პრინციპების დაცვა."
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
          <h3 className="text-xl font-semibold text-gray-800 mb-2">BLW რეკომენდაციები</h3>
          <p className="text-gray-600">
            თქვენი ბავშვი ჯერ არ არის 6 თვის. BLW რეკომენდაციები ხელმისაწვდომი იქნება, როცა თქვენი ბავშვი მზად იქნება დამატებითი კვებისთვის.
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
          <h2 className="text-2xl font-bold text-gray-800">BLW - ბავშვის მიერ მიმართული კვება</h2>
        </div>
        <button
          onClick={onToggle}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-xl"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              რეკომენდაციების დამალვა
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              რეკომენდაციების გაშლა
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
                  <h3 className="text-xl font-semibold text-gray-800">BLW რეცეპტები</h3>
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
                        <p><strong>ინგრედიენტები:</strong> {recipe.ingredients.join(', ')}</p>
                        <p><strong>მომზადება:</strong> {recipe.instructions}</p>
                        <p><strong>რჩევა:</strong> {recipe.tips}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Guide */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-purple-500" />
                  <h3 className="text-xl font-semibold text-gray-800">განხორციელების ეტაპობრივი გეგმა</h3>
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
                <h3 className="text-xl font-semibold text-gray-800">ხშირად დასმული კითხვები</h3>
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
                <h4 className="font-semibold text-red-800">უსაფრთხოების მნიშვნელოვანი შეხსენება</h4>
              </div>
              <p className="text-red-700 text-sm">
                ყოველთვის იყავით ბავშვთან ახლოს კვების დროს. BLW მოითხოვს მუდმივ მეთვალყურეობას.
                მიმართეთ პედიატრს, თუ რაიმე შეკითხვა გაქვთ.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
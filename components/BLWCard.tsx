'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Baby, Utensils, AlertTriangle, Lightbulb, Heart } from 'lucide-react';

interface BLWCardProps {
  childAge: number;
  childAgeInMonths: number;
  index: number;
}

export default function BLWCard({ childAge, childAgeInMonths, index }: BLWCardProps) {
  // Debug logging
  console.log('BLWCard received - childAge:', childAge, 'childAgeInMonths:', childAgeInMonths);
  
  const isBLWReady = childAgeInMonths >= 6; // 6+ months
  const isBLFriendly = childAgeInMonths >= 6 && childAgeInMonths < 12; // 6-12 months
  
  console.log('BLWCard calculations - isBLWReady:', isBLWReady, 'isBLFriendly:', isBLFriendly);

  const blwFoods = [
    {
      name: "ავოკადო",
      description: "რბილი, ადვილად ეტყობა ხელში",
      safety: "იდეალურია BLW-ს დასაწყებად",
      preparation: "დაჭერით ზოლებად"
    },
    {
      name: "ბანანი",
      description: "ტკბილი, რბილი ხილი",
      safety: "უსაფრთხოა BLW-სთვის",
      preparation: "დაჭერით ჯოხებად ან წრეებად"
    },
    {
      name: "ბროკოლი",
      description: "კარგად ეტყობა ყუნწიდან",
      safety: "იდეალურია საკრავი რეფლექსის განვითარებისთვის",
      preparation: "მოხარშეთ ორთქლზე სანამ რბილი გახდება"
    },
    {
      name: "სტაფილო",
      description: "ნათელი ფერი ბავშვის ყურადღებას იპყრობს",
      safety: "მოხარშეთ სანამ რბილი გახდება",
      preparation: "დაჭერით გრძელ ზოლებად"
    },
    {
      name: "კვერცხი",
      description: "ცილის შესანიშნავი წყარო",
      safety: "სრულად მოხარშეთ გული და ცილა",
      preparation: "ომლეტი ან მოხარშული კვერცხი დაჭერით ნაჭრებად"
    }
  ];

  const blwTips = [
    "ბავშვმა უნდა იჯდეს სწორად მხარდაჭერის გარეშე",
    "დაიწყეთ რბილი საკვებით თითის ზომის ნაჭრებად",
    "ყოველთვის იყავით მახლობლად ჭამის დროს",
    "ნუ იჩქარებთ ბავშვს - მისცეთ საკუთარი ტემპით ჭამის საშუალება",
    "ნება მიეცით ბავშვს ხელით შეისწავლოს საკვები"
  ];

  const safetyWarnings = [
    "გააცილეთ მრგვალი საკვები (ყურძენი, პომიდორი)",
    "არ მიეცით თხილი, თესლი, პოპკორნი 4 წლამდე",
    "გააცილეთ თაფლი 1 წლამდე",
    "არ მიეცით ძროხის რძე 1 წლამდე",
    "ყოველთვის დაჭერით საკვებს უსაფრთხო ზომებად"
  ];

  if (!isBLWReady) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200"
      >
        <div className="flex items-center gap-3 mb-4">
          <Baby className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-semibold text-gray-800">BLW - ბავშვის მიერ ხელმძღვანელობადი კვება</h3>
        </div>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-blue-500" />
          </div>
          <h4 className="text-lg font-medium text-gray-700 mb-2">ჯერ ადრეა BLW-სთვის</h4>
          <p className="text-gray-600 text-sm">
            თქვენს ბავშვს ჯერ არ აქვს 6 თვე. BLW შეიძლება დაიწყოს მხოლოდ მაშინ, როცა ბავშვი:
          </p>
          <ul className="text-left text-sm text-gray-600 mt-3 space-y-1">
            <li>• შეუძლია დამოუკიდებლად სხდომა</li>
            <li>• აქვს თავის კარგად კონტროლი</li>
            <li>• ინტერესს იჩენს საკვების მიმართ</li>
            <li>• შეუძლია საგნების აღება და პირთან მიტანა</li>
          </ul>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-green-200"
    >
      <div className="flex items-center gap-3 mb-4">
        <Utensils className="w-6 h-6 text-green-500" />
        <h3 className="text-xl font-semibold text-gray-800">BLW - ბავშვის მიერ ხელმძღვანელობადი კვება</h3>
      </div>

      {/* BLW Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-green-600" />
          <span className="font-medium text-green-800">მზადაა BLW-სთვის!</span>
        </div>
        <p className="text-green-700 text-sm">
          თქვენი ბავშვი მზადაა დამოუკიდებელი კვებისთვის! BLW დაეხმარება მოტორული უნარებისა და ჯანსაღი კვების ჩვევების განვითარებაში.
        </p>
      </div>

      {/* Recommended Foods */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-500" />
          რეკომენდებული საკვები BLW-სთვის
        </h4>
        <div className="space-y-3">
          {blwFoods.map((food, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-gray-800">{food.name}</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  უსაფრთხო
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{food.description}</p>
              <p className="text-xs text-gray-500">
                <span className="font-medium">მომზადება:</span> {food.preparation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BLW Tips */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">BLW-ს ძირითადი პრინციპები</h4>
        <ul className="space-y-2">
          {blwTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Safety Warnings */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          უსაფრთხოების მნიშვნელოვანი წესები
        </h4>
        <ul className="space-y-1">
          {safetyWarnings.map((warning, idx) => (
            <li key={idx} className="text-sm text-red-700 flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
              {warning}
            </li>
          ))}
        </ul>
      </div>

      {/* Age-specific note */}
      {isBLFriendly && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>შეხსენება:</strong> 6-12 თვის ასაკში კვების მთავარი წყარო 
            რძე (მაწონი) ან ნარევი უნდა იყოს. მყარი საკვები არის დამატება, და არა ჩანაცვლება.
          </p>
        </div>
      )}
    </motion.div>
  );
}
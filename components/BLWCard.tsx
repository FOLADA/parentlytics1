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
      name: "Авокадо",
      description: "Мягкий, легко держится в руках",
      safety: "Отлично подходит для начала BLW",
      preparation: "Нарезать на длинные полоски"
    },
    {
      name: "Банан",
      description: "Сладкий, мягкий фрукт",
      safety: "Безопасен для BLW",
      preparation: "Нарезать на палочки или кружочки"
    },
    {
      name: "Брокколи",
      description: "Хорошо держится за стебель",
      safety: "Отлично для развития хватательного рефлекса",
      preparation: "Приготовить на пару до мягкости"
    },
    {
      name: "Морковь",
      description: "Яркий цвет привлекает внимание",
      safety: "Приготовить до мягкости",
      preparation: "Нарезать на длинные палочки"
    },
    {
      name: "Яйца",
      description: "Отличный источник белка",
      safety: "Полностью приготовить желток и белок",
      preparation: "Омлет или вареное яйцо нарезать на кусочки"
    }
  ];

  const blwTips = [
    "Ребенок должен сидеть прямо без поддержки",
    "Начинайте с мягких продуктов размером с палец",
    "Всегда находитесь рядом во время еды",
    "Не торопите ребенка - пусть ест в своем темпе",
    "Позвольте ребенку исследовать еду руками"
  ];

  const safetyWarnings = [
    "Избегайте круглых продуктов (виноград, помидоры черри)",
    "Не давайте орехи, семечки, попкорн до 4 лет",
    "Избегайте меда до 1 года",
    "Не давайте коровье молоко до 1 года",
    "Всегда нарезайте еду на безопасные размеры"
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
          <h3 className="text-xl font-semibold text-gray-800">BLW - Baby Led Weaning</h3>
        </div>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-blue-500" />
          </div>
          <h4 className="text-lg font-medium text-gray-700 mb-2">Еще рано для BLW</h4>
          <p className="text-gray-600 text-sm">
            Вашему ребенку еще нет 6 месяцев. BLW можно начинать только когда ребенок:
          </p>
          <ul className="text-left text-sm text-gray-600 mt-3 space-y-1">
            <li>• Может сидеть без поддержки</li>
            <li>• Имеет хороший контроль головы</li>
            <li>• Проявляет интерес к еде</li>
            <li>• Может брать предметы и подносить ко рту</li>
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
        <h3 className="text-xl font-semibold text-gray-800">BLW - Baby Led Weaning</h3>
      </div>

      {/* BLW Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-green-600" />
          <span className="font-medium text-green-800">Готов к BLW!</span>
        </div>
        <p className="text-green-700 text-sm">
          Ваш ребенок готов к самостоятельному питанию! BLW поможет развить моторику и здоровые пищевые привычки.
        </p>
      </div>

      {/* Recommended Foods */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-500" />
          Рекомендуемые продукты для BLW
        </h4>
        <div className="space-y-3">
          {blwFoods.map((food, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-gray-800">{food.name}</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Безопасно
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{food.description}</p>
              <p className="text-xs text-gray-500">
                <span className="font-medium">Приготовление:</span> {food.preparation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BLW Tips */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">Основные принципы BLW</h4>
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
          Важные правила безопасности
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
            <strong>Напоминание:</strong> В возрасте 6-12 месяцев основным источником питания 
            должно оставаться грудное молоко или смесь. Твердая пища - это дополнение, а не замена.
          </p>
        </div>
      )}
    </motion.div>
  );
} 
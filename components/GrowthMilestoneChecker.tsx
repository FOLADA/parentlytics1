'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface Milestone {
  category: string;
  description: string;
}

export default function GrowthMilestoneChecker() {
  const [age, setAge] = useState<number>(1);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMilestones = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/milestones/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ age }),
      });
      const data = await response.json();
      setMilestones(data.milestones);
    } catch (error) {
      console.error('Error fetching milestones:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Growth Milestone Quick-Check
        </h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Child&apos;s Age (in years)
          </label>
          <input
            type="range"
            min="1"
            max="18"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center mt-2 font-medium text-blue-600">
            {age} years old
          </div>
        </div>

        <Button
          onClick={fetchMilestones}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
        >
          {loading ? 'Generating...' : 'Check Milestones'}
        </Button>

        <AnimatePresence>
          {milestones.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 space-y-4"
            >
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-blue-50 rounded-lg border border-blue-100"
                >
                  <h3 className="font-semibold text-blue-800 mb-1">
                    {milestone.category}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}

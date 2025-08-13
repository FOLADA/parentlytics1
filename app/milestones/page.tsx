'use client';

import GrowthMilestoneChecker from '@/components/GrowthMilestoneChecker';

export default function MilestonesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Growth Milestones</h1>
      <GrowthMilestoneChecker />
    </div>
  );
}

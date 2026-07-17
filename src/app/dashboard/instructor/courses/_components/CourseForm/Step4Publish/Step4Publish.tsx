import { CourseFormValues } from '../schema';

interface Step4PublishProps {
  watchedThumbnail?: string;
  watchedTitle?: string;
  watchedCategory?: string;
  watchedLevel?: string;
  watchedTags?: string[];
  watchedRequirements?: string;
  watchedWhatYouLearn?: string;
  watchedSections?: CourseFormValues['sections'];
  watchedPrice?: string;
}

const Step4Publish = ({
  watchedThumbnail,
  watchedTitle,
  watchedCategory,
  watchedLevel,
  watchedTags,
  watchedRequirements,
  watchedWhatYouLearn,
  watchedSections,
  watchedPrice,
}: Step4PublishProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Ready to Publish</h2>
      <div className="space-y-3">
        {[
          {
            label: 'Thumbnail',
            value: watchedThumbnail ? 'Uploaded' : 'Not set',
            done: !!watchedThumbnail,
          },
          { label: 'Course Title', value: watchedTitle || 'Not set', done: !!watchedTitle },
          {
            label: 'Category',
            value: watchedCategory || 'Not set',
            done: !!watchedCategory,
          },
          { label: 'Level', value: watchedLevel || 'Not set', done: !!watchedLevel },
          {
            label: 'Tags',
            value: `${watchedTags?.length ?? 0} added`,
            done: (watchedTags?.length ?? 0) > 0,
          },
          {
            label: 'Requirements',
            value: watchedRequirements && watchedRequirements.length > 10 ? 'Added' : 'Not set',
            done: !!watchedRequirements && watchedRequirements.length > 10,
          },
          {
            label: "What You'll Learn",
            value: watchedWhatYouLearn && watchedWhatYouLearn.length > 10 ? 'Added' : 'Not set',
            done: !!watchedWhatYouLearn && watchedWhatYouLearn.length > 10,
          },
          {
            label: 'Curriculum',
            value: `${watchedSections?.length ?? 0} sections`,
            done: (watchedSections?.length ?? 0) > 0,
          },
          {
            label: 'Price',
            value: watchedPrice ? `৳${watchedPrice}` : 'Not set',
            done: !!watchedPrice,
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`flex items-center justify-between rounded-sm border p-4 ${
              item.done ? 'border-emerald-100 bg-emerald-50/50' : 'border-red-100 bg-red-50/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                  item.done ? 'bg-primary text-white' : 'text-danger bg-red-100'
                }`}
              >
                {item.done ? '✓' : '!'}
              </div>
              <span className="text-sm font-semibold">{item.label}</span>
            </div>
            <span className="text-text-secondary text-xs">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="rounded-sm border border-yellow-100 bg-yellow-50 p-4 text-xs">
        📋 After submission, your course will be reviewed by our admin team. You will be notified
        once it is approved.
      </div>
    </div>
  );
};

export default Step4Publish;

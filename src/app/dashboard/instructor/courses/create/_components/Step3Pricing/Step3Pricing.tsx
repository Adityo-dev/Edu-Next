import { Control, FieldErrors } from 'react-hook-form';
import { CourseFormValues } from '../schema';
import InputField from '@/components/dashboard/Fields/InputField/InputField';

interface Step3PricingProps {
  control: Control<CourseFormValues>;
  errors: FieldErrors<CourseFormValues>;
  watchedPrice?: string;
  watchedEstimatedPrice?: string;
}

const Step3Pricing = ({
  control,
  errors,
  watchedPrice,
  watchedEstimatedPrice,
}: Step3PricingProps) => {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold">Pricing</h2>
      <div className="rounded-sm border border-emerald-100 bg-emerald-50 p-4 text-sm text-slate-600">
        💡 EduNext deducts a <span className="text-primary font-bold">20% platform commission</span>{' '}
        from each sale. You keep the remaining 80%.
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          label="Course Price (BDT)"
          name="price"
          control={control}
          type="text"
          placeholder="1500"
          required
          error={errors.price?.message}
        />
        <div>
          <InputField
            label="Estimated / Original Price (BDT)"
            name="estimatedPrice"
            control={control}
            type="text"
            placeholder="e.g. 2500 (shown as strikethrough)"
            error={errors.estimatedPrice?.message}
          />
          <p className="mt-1 text-xs text-slate-400">
            Optional — shows a discount badge to students. Leave empty to skip.
          </p>
        </div>
      </div>

      {watchedPrice && !errors.price && (
        <div className="rounded-sm border border-slate-100 bg-white p-5">
          <h3 className="mb-3 text-sm font-bold">Revenue Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Course Price</span>
              <span className="font-semibold">৳{parseInt(watchedPrice).toLocaleString()}</span>
            </div>
            {watchedEstimatedPrice && (
              <div className="flex justify-between text-slate-400">
                <span>Estimated Price</span>
                <span className="line-through">
                  ৳{parseInt(watchedEstimatedPrice).toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between text-red-500">
              <span>Platform Commission (20%)</span>
              <span>- ৳{(parseInt(watchedPrice) * 0.2).toLocaleString()}</span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex justify-between font-bold">
              <span>You Earn Per Sale</span>
              <span className="text-primary">
                ৳{(parseInt(watchedPrice) * 0.8).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step3Pricing;

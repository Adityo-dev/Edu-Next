import InputField from '@/components/dashboard/Fields/InputField/InputField';
import { Control, FieldErrors } from 'react-hook-form';
import { CourseFormValues } from '../schema';

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
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Pricing</h2>
      <div className="rounded-sm border border-emerald-100 bg-emerald-50 p-3 text-sm">
        💡 EduNext deducts a{' '}
        <span className="text-primary font-semibold">20% platform commission</span> from each sale.
        You keep the remaining 80%.
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          label="Course Price (BDT)"
          name="price"
          control={control}
          type="number"
          placeholder="Enter course price"
          required
          error={errors.price?.message}
        />
        <div>
          <InputField
            label="Estimated / Original Price (BDT)"
            name="estimatedPrice"
            control={control}
            type="number"
            placeholder="Enter estimated price"
            error={errors.estimatedPrice?.message}
          />
          <p className="text-text-placeholder mt-1 text-xs">
            Optional — shows a discount badge to students. Leave empty to skip.
          </p>
        </div>
      </div>

      {watchedPrice && !errors.price && (
        <div className="border-border rounded-sm border p-3">
          <h3 className="mb-2.5 text-sm font-semibold">Revenue Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Course Price</span>
              <span className="font-semibold">৳{parseInt(watchedPrice).toLocaleString()}</span>
            </div>
            {watchedEstimatedPrice && (
              <div className="flex justify-between">
                <span>Estimated Price</span>
                <span className="line-through">
                  ৳{parseInt(watchedEstimatedPrice).toLocaleString()}
                </span>
              </div>
            )}
            <div className="text-danger flex justify-between">
              <span>Platform Commission (20%)</span>
              <span>- ৳{(parseInt(watchedPrice) * 0.2).toLocaleString()}</span>
            </div>
            <div className="bg-border h-px" />
            <div className="flex justify-between font-semibold">
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

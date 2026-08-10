import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import { CheckCircle, FileText, Globe, Layers, Layout, PlayCircle, Tag } from 'lucide-react';
import Image from 'next/image';
import { CourseFormValues } from '../schema';

interface Step4PublishProps {
  formData: CourseFormValues;
}

const Step4Publish = ({ formData }: Step4PublishProps) => {
  const totalModules = formData.sections?.length || 0;
  const totalLessons =
    formData.sections?.reduce((acc, section) => acc + (section.lessons?.length || 0), 0) || 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Course Preview</h2>
        <DynamicBadge text="Ready to Publish" color="#10b981" />
      </div>

      <div className="dashboard-card-container overflow-hidden p-0">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            {formData.thumbnail ? (
              <Image
                src={formData.thumbnail}
                alt="Course Thumbnail"
                width={800}
                height={600}
                className="h-full w-full object-cover md:min-h-55"
              />
            ) : (
              <div className="flex h-full min-h-55 w-full items-center justify-center bg-slate-100 text-slate-400">
                <Layout size={40} />
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                <DynamicBadge text={formData.category || 'No Category'} color="#34796f" />
                {formData.subCategory && (
                  <DynamicBadge text={formData.subCategory} color="#475569" />
                )}
                {formData.level && <DynamicBadge text={formData.level} color="#4f46e5" />}
              </div>
              <h1 className="mb-2 font-semibold md:text-xl">
                {formData.title || 'Untitled Course'}
              </h1>
              <p className="text-text-secondary text-sm">
                {formData.subtitle || 'No subtitle provided.'}
              </p>
            </div>

            <div className="text-text-secondary mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-100 pt-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Globe size={16} className="text-text-secondary" />
                <span>{formData.language || 'Language not set'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText size={16} className="text-text-secondary" />
                <span>{formData.hasCertificate ? 'Certificate Included' : 'No Certificate'}</span>
              </div>
              <div className="ml-auto text-right">
                <span className="text-2xl font-semibold">
                  {formData.price ? `৳${formData.price}` : 'Free'}
                </span>
                {formData.estimatedPrice && formData.estimatedPrice !== formData.price && (
                  <span className="text-text-secondary ml-2 text-sm line-through">
                    ৳{formData.estimatedPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Left Column: Details */}
        <div className="space-y-4 md:col-span-2">
          {/* About */}
          <div className="dashboard-card-container">
            <h3 className="mb-3 text-base font-semibold">About This Course</h3>
            <div
              className="prose prose-sm prose-slate text-text-secondary max-w-none"
              dangerouslySetInnerHTML={{
                __html: formData.description || 'No description provided.',
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* What You'll Learn */}
            <div className="dashboard-card-container">
              <h3 className="mb-3 text-base font-semibold">What You&apos;ll Learn</h3>
              <div
                className="prose prose-sm prose-slate text-text-secondary max-w-none"
                dangerouslySetInnerHTML={{
                  __html: formData.whatYouLearn || 'No learning outcomes provided.',
                }}
              />
            </div>

            {/* Requirements */}
            <div className="dashboard-card-container">
              <h3 className="mb-3 text-base font-semibold">Requirements</h3>
              <div
                className="prose prose-sm prose-slate text-text-secondary max-w-none"
                dangerouslySetInnerHTML={{
                  __html: formData.requirements || 'No requirements provided.',
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Tags */}
        <div className="space-y-4">
          <div className="dashboard-card-container">
            <h3 className="mb-3 text-base font-semibold">Curriculum Stats</h3>
            <div className="space-y-4">
              <div className="dashboard-card-container flex items-center gap-3 bg-slate-50/50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Layers size={18} />
                </div>
                <div>
                  <p className="text-text-secondary text-xs font-semibold tracking-wider uppercase">
                    Total Modules
                  </p>
                  <p className="text-lg font-semibold">{totalModules}</p>
                </div>
              </div>
              <div className="dashboard-card-container flex items-center gap-3 bg-slate-50/50 p-3">
                <div className="text-success flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <PlayCircle size={18} />
                </div>
                <div>
                  <p className="text-text-secondary text-xs font-semibold tracking-wider uppercase">
                    Total Lessons
                  </p>
                  <p className="text-lg font-semibold">{totalLessons}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card-container">
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold">
              <Tag size={16} className="text-text-secondary" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {formData.tags?.length ? (
                formData.tags.map((tag, i) => (
                  <DynamicBadge key={i} text={`#${tag}`} color="#475569" />
                ))
              ) : (
                <span className="text-sm text-slate-500">No tags added.</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card-container border-warning/50 bg-warning/6 flex items-start gap-3 text-sm shadow-none">
        <CheckCircle className="text-warning mt-0.5 shrink-0" size={18} />
        <p className="text-text-primary">
          <strong className="font-medium">Ready for submission!</strong> After submitting, your
          course will be reviewed by our admin team to ensure quality. You will be notified once it
          is approved and published.
        </p>
      </div>
    </div>
  );
};

export default Step4Publish;

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, Send, Loader2 } from "lucide-react";

// Validation schema
const feedbackSchema = z.object({
    name: z.string().optional(),
    rating: z.number().min(1, "Please select a rating").max(5),
    feedback: z.string().min(10, "Please provide at least 10 characters"),
    phone: z.string().optional(),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

// Star Rating component
function StarRating({
    value,
    onChange,
    error
}: {
    value: number;
    onChange: (rating: number) => void;
    error?: string;
}) {
    const [hoverValue, setHoverValue] = useState(0);

    return (
        <div className="space-y-2">
            <div
                className="star-rating flex items-center gap-1"
                onMouseLeave={() => setHoverValue(0)}
            >
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange(star)}
                        onMouseEnter={() => setHoverValue(star)}
                        className="p-1 focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)] rounded"
                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                    >
                        <Star
                            className={`w-8 h-8 transition-colors ${star <= (hoverValue || value)
                                ? "text-[var(--color-turmeric)] fill-[var(--color-turmeric)]"
                                : "text-[var(--color-border)]"
                                }`}
                        />
                    </button>
                ))}
                {value > 0 && (
                    <span className="ml-2 text-[var(--color-text-light)] text-sm">
                        {value === 1 && "Poor"}
                        {value === 2 && "Fair"}
                        {value === 3 && "Good"}
                        {value === 4 && "Very Good"}
                        {value === 5 && "Excellent!"}
                    </span>
                )}
            </div>
            {error && (
                <p className="text-[var(--color-red)] text-sm">{error}</p>
            )}
        </div>
    );
}

interface FeedbackFormProps {
    onSuccess: () => void;
}

export function FeedbackForm({ onSuccess }: FeedbackFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rating, setRating] = useState(0);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm<FeedbackFormData>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            name: "",
            rating: 0,
            feedback: "",
            phone: "",
        },
    });

    const handleRatingChange = (value: number) => {
        setRating(value);
        setValue("rating", value);
    };

    const onSubmit = async (data: FeedbackFormData) => {
        setIsSubmitting(true);

        try {
            // For Netlify Forms, we create a URLSearchParams body and submit
            const body = new URLSearchParams();
            body.append("form-name", "feedback");
            body.append("bot-field", "");
            body.append("name", data.name || "Anonymous");
            body.append("rating", String(data.rating));
            body.append("feedback", data.feedback);
            body.append("phone", data.phone || "Not provided");

            await fetch("/__forms.html", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: body.toString(),
            });

            // Reset form
            reset();
            setRating(0);
            onSuccess();
        } catch (error) {
            console.error("Error submitting feedback:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form
                name="feedback"
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[var(--color-border)] shadow-lg w-full max-w-2xl mx-auto"
            >
                <input type="hidden" name="form-name" value="feedback" />

                {/* Name field (optional) */}
                <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[var(--color-brown)] mb-2"
                    >
                        Your Name <span className="text-[var(--color-text-light)]">(optional)</span>
                    </label>
                    <input
                        {...register("name")}
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white/50 text-[var(--color-text)] placeholder:text-[var(--color-text-light)]/50 focus:border-[var(--color-saffron)] focus:ring-2 focus:ring-[var(--color-saffron)]/20 transition"
                    />
                </div>

                {/* Rating field */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-[var(--color-brown)] mb-2">
                        Rate Your Experience <span className="text-[var(--color-red)]">*</span>
                    </label>
                    <StarRating
                        value={rating}
                        onChange={handleRatingChange}
                        error={errors.rating?.message}
                    />
                </div>

                {/* Feedback field */}
                <div className="mb-5">
                    <label
                        htmlFor="feedback"
                        className="block text-sm font-medium text-[var(--color-brown)] mb-2"
                    >
                        Your Feedback <span className="text-[var(--color-red)]">*</span>
                    </label>
                    <textarea
                        {...register("feedback")}
                        id="feedback"
                        rows={4}
                        placeholder="Tell us about your experience..."
                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white/50 text-[var(--color-text)] placeholder:text-[var(--color-text-light)]/50 focus:border-[var(--color-saffron)] focus:ring-2 focus:ring-[var(--color-saffron)]/20 transition resize-none"
                    />
                    {errors.feedback && (
                        <p className="mt-1 text-[var(--color-red)] text-sm">{errors.feedback.message}</p>
                    )}
                </div>

                {/* Phone field (optional) */}
                <div className="mb-6">
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-[var(--color-brown)] mb-2"
                    >
                        Phone Number <span className="text-[var(--color-text-light)]">(optional)</span>
                    </label>
                    <input
                        {...register("phone")}
                        type="tel"
                        id="phone"
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white/50 text-[var(--color-text)] placeholder:text-[var(--color-text-light)]/50 focus:border-[var(--color-saffron)] focus:ring-2 focus:ring-[var(--color-saffron)]/20 transition"
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-turmeric)] text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Submit Feedback
                        </>
                    )}
                </button>
            </form>
        </>
    );
}

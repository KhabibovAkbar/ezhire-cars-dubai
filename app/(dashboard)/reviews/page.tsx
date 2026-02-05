"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, ThumbsUp, Flag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { reviews } from "@/lib/data";
import { getInitials } from "@/lib/utils";

export default function ReviewsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage:
      (reviews.filter((r) => r.rating === rating).length / reviews.length) *
      100,
  }));

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Header
          title="Reviews"
          subtitle="Customer feedback"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto space-y-6"
          >
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold text-text-primary">
                Customer Reviews
              </h2>
              <p className="text-text-secondary">
                See what customers say about DriveHub
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Overall Rating */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-8 w-8 ${
                            star <= Math.round(parseFloat(averageRating))
                              ? "fill-warning text-warning"
                              : "text-border"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-4xl font-bold text-text-primary mb-1">
                      {averageRating}
                    </p>
                    <p className="text-text-muted">
                      Based on {reviews.length * 40} reviews
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Rating Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Rating Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {ratingDistribution.map((item, index) => (
                        <div
                          key={item.rating}
                          className="flex items-center gap-3"
                        >
                          <div className="flex items-center gap-1 w-20">
                            <span className="text-sm font-medium text-text-primary">
                              {item.rating}
                            </span>
                            <Star className="h-4 w-4 fill-warning text-warning" />
                          </div>
                          <div className="flex-1 h-3 bg-bg-tertiary rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percentage}%` }}
                              transition={{
                                duration: 0.8,
                                delay: 0.3 + index * 0.1,
                              }}
                              className="h-full bg-warning rounded-full"
                            />
                          </div>
                          <span className="text-sm text-text-muted w-10 text-right">
                            {item.count * 8}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                >
                  <Card className="overflow-hidden hover:border-border-hover transition-colors">
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>
                              {getInitials(review.customer)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-text-primary">
                              {review.customer}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-text-muted">
                                {review.vehicle}
                              </span>
                              <span className="text-text-muted">•</span>
                              <span className="text-sm text-text-muted">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? "fill-warning text-warning"
                                  : "text-border"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Comment */}
                      <p className="text-text-secondary mb-4 leading-relaxed">
                        &ldquo;{review.comment}&rdquo;
                      </p>

                      {/* Actions */}
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 text-text-muted hover:text-text-primary"
                        >
                          <MessageSquare className="h-4 w-4" />
                          Reply
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 text-text-muted hover:text-text-primary"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          Helpful
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 text-text-muted hover:text-danger"
                        >
                          <Flag className="h-4 w-4" />
                          Flag
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

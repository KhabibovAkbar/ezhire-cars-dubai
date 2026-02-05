"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, ThumbsUp, Flag, X, Send, Check, AlertTriangle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { reviews } from "@/lib/data";
import { getInitials } from "@/lib/utils";

export default function ReviewsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [flagDialogOpen, setFlagDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<typeof reviews[0] | null>(null);
  const [replyText, setReplyText] = useState("");
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());
  const [flaggedReviews, setFlaggedReviews] = useState<Set<string>>(new Set());
  const [repliedReviews, setRepliedReviews] = useState<Map<string, string>>(new Map());
  const [showToast, setShowToast] = useState<{ message: string; type: "success" | "warning" } | null>(null);

  const handleReply = (review: typeof reviews[0]) => {
    setSelectedReview(review);
    setReplyText(repliedReviews.get(review.id) || "");
    setReplyDialogOpen(true);
  };

  const handleSubmitReply = () => {
    if (selectedReview && replyText.trim()) {
      setRepliedReviews(new Map(repliedReviews.set(selectedReview.id, replyText)));
      setReplyDialogOpen(false);
      setReplyText("");
      showToastMessage("Reply sent successfully!", "success");
    }
  };

  const handleHelpful = (reviewId: string) => {
    const newHelpful = new Set(helpfulReviews);
    if (newHelpful.has(reviewId)) {
      newHelpful.delete(reviewId);
    } else {
      newHelpful.add(reviewId);
      showToastMessage("Marked as helpful", "success");
    }
    setHelpfulReviews(newHelpful);
  };

  const handleFlag = (review: typeof reviews[0]) => {
    setSelectedReview(review);
    setFlagDialogOpen(true);
  };

  const handleConfirmFlag = () => {
    if (selectedReview) {
      const newFlagged = new Set(flaggedReviews);
      newFlagged.add(selectedReview.id);
      setFlaggedReviews(newFlagged);
      setFlagDialogOpen(false);
      showToastMessage("Review flagged for moderation", "warning");
    }
  };

  const showToastMessage = (message: string, type: "success" | "warning") => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  };

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
                See what customers say about Ezhire Cars
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

                      {/* Reply shown */}
                      {repliedReviews.has(review.id) && (
                        <div className="mb-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
                          <p className="text-sm text-text-secondary">
                            <span className="font-medium text-accent">Your reply:</span>{" "}
                            {repliedReviews.get(review.id)}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReply(review)}
                          className={`gap-2 ${
                            repliedReviews.has(review.id)
                              ? "text-accent"
                              : "text-text-muted hover:text-text-primary"
                          }`}
                        >
                          <MessageSquare className="h-4 w-4" />
                          {repliedReviews.has(review.id) ? "Edit Reply" : "Reply"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleHelpful(review.id)}
                          className={`gap-2 ${
                            helpfulReviews.has(review.id)
                              ? "text-success"
                              : "text-text-muted hover:text-text-primary"
                          }`}
                        >
                          <ThumbsUp className={`h-4 w-4 ${helpfulReviews.has(review.id) ? "fill-success" : ""}`} />
                          {helpfulReviews.has(review.id) ? "Helpful!" : "Helpful"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFlag(review)}
                          disabled={flaggedReviews.has(review.id)}
                          className={`gap-2 ${
                            flaggedReviews.has(review.id)
                              ? "text-danger"
                              : "text-text-muted hover:text-danger"
                          }`}
                        >
                          <Flag className={`h-4 w-4 ${flaggedReviews.has(review.id) ? "fill-danger" : ""}`} />
                          {flaggedReviews.has(review.id) ? "Flagged" : "Flag"}
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

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Reply to Review</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div className="p-3 bg-bg-tertiary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-text-primary">{selectedReview.customer}</span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= selectedReview.rating
                            ? "fill-warning text-warning"
                            : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-text-secondary">&ldquo;{selectedReview.comment}&rdquo;</p>
              </div>
              <Textarea
                placeholder="Write your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitReply} disabled={!replyText.trim()} className="gap-2">
              <Send className="h-4 w-4" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Flag Dialog */}
      <Dialog open={flagDialogOpen} onOpenChange={setFlagDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-danger">
              <AlertTriangle className="h-5 w-5" />
              Flag Review
            </DialogTitle>
          </DialogHeader>
          <p className="text-text-secondary">
            Are you sure you want to flag this review for moderation? This action will notify the moderation team.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFlagDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmFlag} className="gap-2">
              <Flag className="h-4 w-4" />
              Flag Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
              showToast.type === "success"
                ? "bg-success text-white"
                : "bg-warning text-white"
            }`}
          >
            {showToast.type === "success" ? (
              <Check className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
            {showToast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

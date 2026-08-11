import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme-provider";
import { Loader2, BookOpen, ExternalLink, Sparkles, CheckCircle2, XCircle, Moon, Sun } from "lucide-react";

interface Submission {
  id: number;
  taskType: string;
  title: string;
  filePath: string;
  commitUrl: string;
  createdAt: number;
}

interface SubmitResult {
  taskType: string;
  taskTypeLabel: string;
  title: string;
  filePath: string;
  commitUrl: string;
  markdown: string;
}

interface RepoConfig {
  owner: string;
  repo: string;
  archiveRoot: string;
}

const TASK_LABELS: Record<string, string> = {
  "write-an-email": "Write an Email",
  "academic-discussion": "Academic Discussion",
  "interview": "Interview",
  "listen-and-repeat": "Listen and Repeat",
};

const TASK_COLORS: Record<string, string> = {
  "write-an-email": "bg-chart-1/15 text-chart-1 border-chart-1/30",
  "academic-discussion": "bg-chart-2/15 text-chart-2 border-chart-2/30",
  "interview": "bg-chart-3/15 text-chart-3 border-chart-3/30",
  "listen-and-repeat": "bg-chart-4/15 text-chart-4 border-chart-4/30",
};

export default function Home() {
  const [rawInput, setRawInput] = useState("");
  const [lastResult, setLastResult] = useState<SubmitResult | null>(null);
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();

  const { data: submissions, isLoading: submissionsLoading } = useQuery<Submission[]>({
    queryKey: ["/api/submissions"],
  });

  const { data: config } = useQuery<RepoConfig>({
    queryKey: ["/api/config"],
  });
  const repoLabel = config ? `${config.owner}/${config.repo}` : "GitHub";

  const submitMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/submit", { rawInput });
      return (await res.json()) as SubmitResult;
    },
    onSuccess: (data) => {
      setLastResult(data);
      setRawInput("");
      queryClient.invalidateQueries({ queryKey: ["/api/submissions"] });
      toast({
        title: "Archived",
        description: `Classified as ${data.taskTypeLabel} and pushed to GitHub.`,
      });
    },
    onError: (err: Error) => {
      toast({
        title: "Could not archive this",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-8 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BookOpen className="h-5 w-5" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h1 className="font-serif text-xl text-foreground" data-testid="text-page-title">
              Polished 5/5 Responses
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Paste a raw tutoring transcript — prompt, your draft, and the AI-polished
              final version. It's classified automatically and committed straight to{" "}
              <span className="font-mono text-xs" data-testid="text-repo-label">{repoLabel}</span> on GitHub.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-toggle-theme"
            aria-label="Toggle dark mode"
            className="shrink-0"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {/* Paste + submit */}
        <section aria-labelledby="paste-heading">
          <Card className="border-card-border">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 id="paste-heading" className="text-lg font-serif text-foreground">
                  Incoming
                </h2>
                <span className="text-xs text-muted-foreground">
                  {rawInput.length.toLocaleString()} characters
                </span>
              </div>
              <Textarea
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                placeholder="Paste the whole exchange here: the original prompt, your draft, and the polished version the AI gave you. Formatting doesn't matter — just paste everything."
                className="min-h-[220px] font-mono text-sm resize-y"
                data-testid="input-raw-paste"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Detects Write an Email, Academic Discussion, Interview, or Listen and Repeat automatically.
                </p>
                <Button
                  onClick={() => submitMutation.mutate()}
                  disabled={!rawInput.trim() || submitMutation.isPending}
                  data-testid="button-submit"
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Classifying & archiving…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Classify & Archive
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Result of the most recent submission */}
        {lastResult && (
          <section aria-labelledby="result-heading">
            <Card className="border-card-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-chart-3" />
                  <h2 id="result-heading" className="text-lg font-serif text-foreground">
                    Archived just now
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={TASK_COLORS[lastResult.taskType] ?? ""}
                    data-testid="badge-last-task-type"
                  >
                    {lastResult.taskTypeLabel}
                  </Badge>
                  <span className="text-sm text-foreground" data-testid="text-last-title">
                    {lastResult.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <span data-testid="text-last-path">{lastResult.filePath}</span>
                </div>
                <a
                  href={lastResult.commitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  data-testid="link-last-commit"
                >
                  View commit on GitHub
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <details className="group">
                  <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                    Preview formatted content
                  </summary>
                  <pre className="mt-3 whitespace-pre-wrap text-sm bg-muted rounded-md p-4 max-h-96 overflow-y-auto font-sans">
                    {lastResult.markdown}
                  </pre>
                </details>
              </CardContent>
            </Card>
          </section>
        )}

        {/* History */}
        <section aria-labelledby="history-heading">
          <h2 id="history-heading" className="text-lg font-serif text-foreground mb-4">
            Archive log
          </h2>
          {submissionsLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
          ) : !submissions || submissions.length === 0 ? (
            <Card className="border-card-border border-dashed">
              <CardContent className="p-8 text-center">
                <XCircle className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground" data-testid="text-empty-history">
                  Nothing archived yet. Paste your first transcript above.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {submissions.map((s) => (
                <a
                  key={s.id}
                  href={s.commitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  data-testid={`link-submission-${s.id}`}
                >
                  <Card className="border-card-border hover-elevate active-elevate-2 transition-colors">
                    <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Badge
                          variant="outline"
                          className={`shrink-0 whitespace-nowrap ${TASK_COLORS[s.taskType] ?? ""}`}
                        >
                          {TASK_LABELS[s.taskType] ?? s.taskType}
                        </Badge>
                        <span className="text-sm text-foreground truncate min-w-0">{s.title}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-muted-foreground font-mono hidden md:inline truncate max-w-[220px]">
                          {s.filePath}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(s.createdAt).toLocaleDateString()}
                        </span>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

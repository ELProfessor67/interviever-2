
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "sonner";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import { ensureTablesExist, getSetupSQLScripts } from "./services/supabase/databaseSetup";
import { StateProvider } from "./contexts/StateContact";

const PersonaAIInterviewer = lazy(() => import("./pages/PersonaAIInterviewer"));
const AIFocusGroups = lazy(() => import("./pages/AIFocusGroups"));
const EarnPRSNA = lazy(() => import("./pages/EarnPRSNA"));
const Contact = lazy(() => import("./pages/Contact"));
const Research = lazy(() => import("./pages/Research"));
const Interviewer = lazy(() => import("./pages/Interviewer"));
const YourPersona = lazy(() => import("./pages/YourPersona"));
const Pricing = lazy(() => import("./pages/Pricing"));
const InterviewRoom = lazy(() => import("./pages/InterviewRoom"));
const InterviewProcess = lazy(() => import("./pages/InterviewProcess"));
const ParticipateResearch = lazy(() => import("./pages/ParticipateResearch"));
const Team = lazy(() => import("./pages/Team"));
const CustomResearch = lazy(() => import("./pages/CustomResearch"));
const PersonaCreationLanding = lazy(() => import("./pages/persona-creation/PersonaCreationLanding"));
const PersonaCreationScreener = lazy(() => import("./pages/persona-creation/PersonaCreationScreener"));
const PersonaCreationQuestionnaire = lazy(() => import("./pages/persona-creation/PersonaCreationQuestionnaire"));
const PersonaCreationAdminQuestionnaire = lazy(() => import("./pages/persona-creation/PersonaCreationAdminQuestionnaire"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const DatabaseSetupInstructions = () => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="max-w-3xl bg-white rounded-lg shadow-xl p-6 md:p-8">
      <h1 className="text-2xl font-bold text-primary mb-4">Supabase Setup Required</h1>
      
      <div className="mb-6 bg-yellow-50 p-4 rounded border border-yellow-200">
        <h2 className="text-lg font-semibold mb-2 text-yellow-800">⚠️ Database Connection Issue</h2>
        <p className="text-yellow-800 mb-2">We're having trouble connecting to your Supabase project. This could be due to:</p>
        <ul className="list-disc pl-6 text-yellow-800">
          <li>Incorrect Supabase URL or API key</li>
          <li>Networking issues</li>
          <li>Supabase is down or restarting</li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Required Storage Buckets</h2>
        <p className="mb-2">Check that you have these buckets in your Supabase storage:</p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>transcripts</strong> - For storing interview transcripts</li>
          <li><strong>interview-audio</strong> - For storing interview recordings</li>
        </ul>
        <p className="text-sm text-gray-600">If they don't exist, the app will try to create them automatically if it has permission.</p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Required Database Tables</h2>
        <p className="mb-2">Check that the participants table exists with the required structure.</p>
        <div className="bg-gray-50 rounded p-4 overflow-x-auto mb-2">
          <pre className="text-xs">{getSetupSQLScripts()}</pre>
        </div>
        <p className="text-sm text-gray-600">You can run this SQL in the Supabase SQL Editor if the table doesn't exist.</p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Verify your Supabase configuration</h2>
        <p className="mb-2">Make sure your Supabase URL and API key are correct. They should match these values:</p>
        <div className="bg-gray-50 rounded p-4 mb-4">
          <p className="mb-2"><strong>URL:</strong> <code className="text-sm">https://wgerdrdsuusnrdnwwelt.supabase.co</code></p>
          <p><strong>API Key:</strong> <code className="text-sm break-all">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnZXJkcmRzdXVzbnJkbnd3ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxODkxMjAsImV4cCI6MjA1Nzc2NTEyMH0.yAoqtSbNo7gabNOSyDrNGNjIUaMIPwyhevV2F-IQHbY</code></p>
        </div>
      </div>
      
      <button 
        onClick={() => window.location.reload()} 
        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
      >
        Refresh and try again
      </button>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
  },
  {
    path: "/research",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Research />
      </Suspense>
    ),
  },
  {
    path: "/interviewer",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Interviewer />
      </Suspense>
    ),
  },
  {
    path: "/your-persona",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <YourPersona />
      </Suspense>
    ),
  },
  {
    path: "/persona-ai-interviewer",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PersonaAIInterviewer />
      </Suspense>
    ),
  },
  {
    path: "/ai-focus-groups",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AIFocusGroups />
      </Suspense>
    ),
  },
  {
    path: "/custom-research",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CustomResearch />
      </Suspense>
    ),
  },
  {
    path: "/prsna-ecosystem",
    element: <Navigate to="/earn-prsna" replace />,
  },
  {
    path: "/earn-prsna",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <EarnPRSNA />
      </Suspense>
    ),
  },
  {
    path: "/contact",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Contact />
      </Suspense>
    ),
  },
  {
    path: "/pricing",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Pricing />
      </Suspense>
    ),
  },
  {
    path: "/interview-process",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <InterviewRoom/>
      </Suspense>
    ),
  },
  {
    path: "/participate-research",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ParticipateResearch />
      </Suspense>
    ),
  },
  {
    path: "/team",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Team />
      </Suspense>
    ),
  },
  {
    path: "/persona-creation/landing",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PersonaCreationLanding />
      </Suspense>
    ),
  },
  {
    path: "/persona-creation/screener",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PersonaCreationScreener />
      </Suspense>
    ),
  },
  {
    path: "/persona-creation/questionnaire",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PersonaCreationQuestionnaire />
      </Suspense>
    ),
  },
  {
    path: "/persona-creation/admin-questionnaire",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PersonaCreationAdminQuestionnaire />
      </Suspense>
    ),
  },
]);

function App() {
  const [isDbReady, setIsDbReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [setupAttempts, setSetupAttempts] = useState(0);

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        console.log('Checking database setup (attempt ' + (setupAttempts + 1) + ')...');
        setIsLoading(true);
        
        // Allow up to 3 attempts to connect to Supabase
        // This helps with intermittent connection issues
        let isReady = false;
        let attempts = 0;
        const maxAttempts = 3;
        
        while (!isReady && attempts < maxAttempts) {
          attempts++;
          try {
            isReady = await ensureTablesExist();
            if (isReady) break;
            
            // Wait a bit before retrying
            if (attempts < maxAttempts) {
              console.log(`Database not ready, retrying in 1s (attempt ${attempts}/${maxAttempts})...`);
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          } catch (attemptError) {
            console.error(`Setup attempt ${attempts} failed:`, attemptError);
          }
        }
        
        console.log('Database ready status:', isReady);
        setIsDbReady(isReady);
        
        if (!isReady && setupAttempts < 2) {
          // Schedule another attempt after a few seconds
          // This helps if Supabase is still initializing
          setTimeout(() => {
            setSetupAttempts(prev => prev + 1);
          }, 3000);
        }
      } catch (error) {
        console.error("Database setup error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkDatabase();
  }, [setupAttempts]);

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!isDbReady) {
    return <DatabaseSetupInstructions />;
  }

  return (
    <>
    <StateProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </StateProvider>
    </>
  );
}

export default App;

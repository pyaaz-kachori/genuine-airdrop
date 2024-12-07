import React from 'react';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface AttestationData {
  pull_request_title: string;
  ai_review: string;
  attestation: string;
}

const CollapsibleDiv: React.FC<AttestationData> = ({
  pull_request_title, 
  ai_review, 
  attestation
}) => {
  return (
    <Collapsible className="w-full border rounded-lg shadow-sm">
      <CollapsibleTrigger className="flex w-full items-center justify-between p-4 hover:bg-gray-50 transition-colors">
        <div className="flex flex-col text-left">
          <h3 className="text-lg font-semibold text-gray-800">
            {pull_request_title}
          </h3>
        </div>
        <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4 pt-0 text-sm text-gray-600">
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-gray-700">AI Review:</h4>
            <p className="mt-1">{ai_review}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700">Attestation:</h4>
            <p className="mt-1">{attestation}</p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleDiv;
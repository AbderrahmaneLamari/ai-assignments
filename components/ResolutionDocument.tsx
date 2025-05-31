import React, { useState, ReactNode} from 'react';
import { ChevronDown, ChevronRight, BookOpen, Brain, CheckCircle, LucideIcon } from 'lucide-react';

// Type Definitions
type BadgeVariant = 'default' | 'blue' | 'green' | 'red' | 'yellow';
type CardVariant = 'default' | 'blue' | 'green' | 'red' | 'yellow';

type LogicFormulaVariant = 'default' | 'premise' | 'conclusion' | 'negation';
type InfoBoxVariant = 'default' | 'warning' | 'info';

interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
}

interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: CardVariant;
}

interface DividerProps {
    className?: string;
}

interface CollapsibleHeaderProps {
    title: string;
    icon: LucideIcon;
    isExpanded: boolean;
    onClick: () => void;
}

interface LogicFormulaProps {
    children: ReactNode;
    variant?: LogicFormulaVariant;
}

interface PredicateDefinitionProps {
    predicate: string;
    description: string;
}

interface ClauseBoxProps {
    number: string;
    content: string;
    highlight?: boolean;
}

interface ResolutionStepProps {
    stepNumber: number;
    description: string;
    result?: string;
    highlight?: boolean;
}

interface ContradictionBoxProps {
    children: ReactNode;
}

interface ContradictionItemProps {
    children: ReactNode;
}

interface CodeSnippetProps {
    children: ReactNode;
}

interface NumberedStepProps {
    number: number;
    children: ReactNode;
}

interface SuccessBoxProps {
    title: string;
    subtitle: string;
    children: ReactNode;
}

interface InfoBoxProps {
    children: ReactNode;
    variant?: InfoBoxVariant;
    className?: string;
}

interface SectionProps {
    isExpanded: boolean;
}

interface PageHeaderProps {
    title: string;
    children?: ReactNode;
}

interface PageFooterProps {
    children: ReactNode;
}

interface CollapsibleSectionProps {
    id: string;
    title: string;
    icon: LucideIcon;
    children: ReactNode;
    expandedSections: ExpandedSections;
    toggleSection: (section: string) => void;
}

interface ExpandedSections {
    problem: boolean;
    formalize: boolean;
    clausal: boolean;
    resolution: boolean;
    conclusion: boolean;
    intuitive: boolean;
}

// Elementary UI Components
const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
    const variants: Record<BadgeVariant, string> = {
        default: 'bg-gray-100 text-gray-800',
        blue: 'bg-blue-100 text-blue-800',
        green: 'bg-green-100 text-green-800',
        red: 'bg-red-100 text-red-800',
        yellow: 'bg-yellow-100 text-yellow-800'
    };

    return (
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${variants[variant]}`}>
            {children}
        </span>
    );
};

const Card: React.FC<CardProps> = ({ children, className = '', variant = 'default' }) => {
    const variants: Record<CardVariant, string> = {
        default: 'bg-white border-gray-300',
        blue: 'bg-blue-50 border-blue-300',
        green: 'bg-green-50 border-green-300',
        red: 'bg-red-50 border-red-300',
        yellow: 'bg-yellow-50 border-yellow-300'
    };

    return (
        <div className={`p-4 rounded-lg border-2 shadow-sm ${variants[variant]} ${className}`}>
            {children}
        </div>
    );
};



const Divider: React.FC<DividerProps> = ({ className = '' }) => (
    <div className={`w-24 h-1 bg-blue-500 mx-auto rounded ${className}`} />
);

// Specialized Components
const CollapsibleHeader: React.FC<CollapsibleHeaderProps> = ({ title, icon: Icon, isExpanded, onClick }) => (
    <div
        className="flex items-center cursor-pointer py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        onClick={onClick}
    >
        <Icon className="w-5 h-5 mr-3 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800 flex-1">{title}</h2>
        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
    </div>
);

const LogicFormula: React.FC<LogicFormulaProps> = ({ children, variant = 'default' }) => {
    const variants: Record<LogicFormulaVariant, string> = {
        default: 'bg-blue-50 border-blue-400',
        premise: 'bg-blue-50 border-blue-400',
        conclusion: 'bg-green-50 border-green-400',
        negation: 'bg-red-50 border-red-400'
    };

    return (
        <div className={`${variants[variant]} border-l-4 p-3 my-2 font-mono text-sm`}>
            {children}
        </div>
    );
};

const PredicateDefinition: React.FC<PredicateDefinitionProps> = ({ predicate, description }) => (
    <div className="bg-gray-50 p-3 rounded">
        <code className="font-mono text-sm">{predicate}</code>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
    </div>
);

const ClauseBox: React.FC<ClauseBoxProps> = ({ number, content, highlight = false }) => (
    <div className={`p-3 rounded border-2 shadow-sm ${highlight ? 'bg-yellow-50 border-yellow-400' : 'bg-white border-gray-300'
        }`}>
        <Badge variant={highlight ? 'yellow' : 'default'}>Clause {number}</Badge>
        <div className="font-mono text-sm mt-2">{content}</div>
    </div>
);

const ResolutionStep: React.FC<ResolutionStepProps> = ({ stepNumber, description, result, highlight = false }) => (
    <Card variant={highlight ? 'green' : 'default'} className="mb-4">
        <Badge variant={highlight ? 'green' : 'blue'}>Step {stepNumber}</Badge>
        <div className="text-sm mt-2 mb-2">{description}</div>
        {result && (
            <div className="font-mono text-sm bg-white p-2 rounded border mt-2">
                <strong>Result:</strong> {result}
            </div>
        )}
    </Card>
);

const ContradictionBox: React.FC<ContradictionBoxProps> = ({ children }) => (
    <Card variant="red" className="text-center">
        <h4 className="font-bold text-red-800 mb-2">Contradiction Found:</h4>
        <div className="space-y-2 text-sm mb-4">{children}</div>
        <div className="text-2xl font-bold text-red-700">□ (Empty Clause)</div>
        <div className="text-lg font-semibold">CONTRADICTION!</div>
    </Card>
);

const ContradictionItem: React.FC<ContradictionItemProps> = ({ children }) => (
    <div className="flex items-center justify-center">
        <span className="mr-2">•</span>
        <span>{children}</span>
    </div>
);

const CodeSnippet: React.FC<CodeSnippetProps> = ({ children }) => (
    <code className="bg-white px-2 py-1 rounded font-mono text-sm">
        {children}
    </code>
);

const NumberedStep: React.FC<NumberedStepProps> = ({ number, children }) => (
    <div className="flex items-start">
        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">
            {number}
        </div>
        <p>{children}</p>
    </div>
);

const SuccessBox: React.FC<SuccessBoxProps> = ({ title, subtitle, children }) => (
    <Card variant="green" className="text-center">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-3">{title}</h3>
        <p className="text-lg mb-4">{subtitle}</p>
        <div className="bg-white p-4 rounded border-2 border-green-300">
            {children}
        </div>
    </Card>
);

const InfoBox: React.FC<InfoBoxProps> = ({ children, variant = 'default', className = '' }) => {
    const variants: Record<InfoBoxVariant, string> = {
        default: 'bg-blue-50 border-blue-400',
        warning: 'bg-yellow-50 border-yellow-400',
        info: 'bg-blue-50 border-blue-400'
    };

    return (
        <div className={`p-3 ${variants[variant]} border-l-4 rounded ${className}`}>
            {children}
        </div>
    );
};

// Section Components
const ProblemStatementSection: React.FC<SectionProps> = ({ isExpanded }) => (
    isExpanded ? (
        <div className="mt-4">
            <Card className="grid md:grid-cols-2 gap-4">
                <Card variant="blue">
                    <h3 className="font-bold text-blue-800 mb-2">Premise:</h3>
                    <p className="text-lg">&quot;Horses are animals&quot;</p>
                </Card>
                <Card variant="green">
                    <h3 className="font-bold text-green-800 mb-2">Conclusion:</h3>
                    <p className="text-lg">&quot;The head of a horse is the head of an animal&quot;</p>
                </Card>
            </Card>
        </div>
    ) : null
);

const FormalizationSection: React.FC<SectionProps> = ({ isExpanded }) => (
    isExpanded ? (
        <div className="mt-4">
            <Card>
                <div className="mb-4">
                    <h3 className="font-bold mb-3">Define Predicates:</h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <PredicateDefinition predicate="Horse(x)" description="x is a horse" />
                        <PredicateDefinition predicate="Animal(x)" description="x is an animal" />
                        <PredicateDefinition predicate="Head(x,y)" description="x is the head of y" />
                    </div>
                </div>

                <LogicFormula variant="premise">
                    <strong>Premise:</strong> ∀x (Horse(x) → Animal(x))
                </LogicFormula>

                <LogicFormula variant="conclusion">
                    <strong>Conclusion:</strong> ∀x,y (Horse(y) ∧ Head(x,y) → ∃z (Animal(z) ∧ Head(x,z)))
                </LogicFormula>

                <InfoBox variant="warning">
                    <p className="text-sm">
                        <strong>Note:</strong> This conclusion is somewhat trivial since if y is a horse and x is the head of y,
                        then z can simply be y itself (since horses are animals).
                    </p>
                </InfoBox>
            </Card>
        </div>
    ) : null
);

const ClausalFormSection: React.FC<SectionProps> = ({ isExpanded }) => (
    isExpanded ? (
        <div className="mt-4">
            <Card>
                <div className="mb-6">
                    <h3 className="font-bold mb-3">Premise in clausal form:</h3>
                    <ClauseBox number="1" content="¬Horse(x) ∨ Animal(x)" />
                </div>

                <div className="mb-4">
                    <h3 className="font-bold mb-3">Negation of conclusion (to prove by contradiction):</h3>
                    <LogicFormula variant="negation">
                        Horse(a) ∧ Head(b,a) ∧ ∀z(¬Animal(z) ∨ ¬Head(b,z))
                    </LogicFormula>
                </div>

                <div>
                    <h3 className="font-bold mb-3">Converting negated conclusion to clausal form:</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <ClauseBox number="2a" content="Horse(a)" />
                        <ClauseBox number="2b" content="Head(b,a)" />
                        <ClauseBox number="2c" content="¬Animal(z) ∨ ¬Head(b,z)" />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">*Clause 2c applies for all z</p>
                </div>
            </Card>
        </div>
    ) : null
);

const ResolutionSection: React.FC<SectionProps> = ({ isExpanded }) => (
    isExpanded ? (
        <div className="mt-4">
            <Card>
                <h3 className="font-bold mb-4">Resolution Steps:</h3>

                <ResolutionStep
                    stepNumber={1}
                    description="Start with clauses from premise and negated conclusion:"
                    result="Clause 1: ¬Horse(x) ∨ Animal(x) and Clause 2a: Horse(a)"
                />

                <ResolutionStep
                    stepNumber={2}
                    description="Resolve clauses 1 and 2a (substitute x = a):"
                    result="Animal(a)"
                    highlight={true}
                />

                <ResolutionStep
                    stepNumber={3}
                    description="We have: Animal(a), Head(b,a), and ¬Animal(z) ∨ ¬Head(b,z)"
                />

                <ResolutionStep
                    stepNumber={4}
                    description="Substitute z = a in clause 2c:"
                    result="¬Animal(a) ∨ ¬Head(b,a)"
                />

                <ResolutionStep
                    stepNumber={5}
                    description="Final resolution with our known facts:"
                />

                <ContradictionBox>
                    <ContradictionItem>We have: <CodeSnippet>Animal(a)</CodeSnippet></ContradictionItem>
                    <ContradictionItem>But clause 2c gives us: <CodeSnippet>¬Animal(a) ∨ ¬Head(b,a)</CodeSnippet></ContradictionItem>
                    <ContradictionItem>We also have: <CodeSnippet>Head(b,a)</CodeSnippet></ContradictionItem>
                    <ContradictionItem>This leads to: <CodeSnippet>Animal(a) ∧ ¬Animal(a)</CodeSnippet></ContradictionItem>
                </ContradictionBox>
            </Card>
        </div>
    ) : null
);

const ConclusionSection: React.FC<SectionProps> = ({ isExpanded }) => (
    isExpanded ? (
        <div className="mt-4">
            <Card>
                <SuccessBox
                    title="Proof Complete!"
                    subtitle="Since we derived a contradiction (empty clause) from the negation of our conclusion, the original statement is proven true by resolution."
                >
                    <p className="text-lg font-semibold text-green-700">
                        &quot;The head of a horse is the head of an animal&quot;
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        logically follows from &quot;horses are animals&quot;
                    </p>
                </SuccessBox>
            </Card>
        </div>
    ) : null
);

const IntuitiveSection: React.FC<SectionProps> = ({ isExpanded }) => (
    isExpanded ? (
        <div className="mt-4">
            <Card>
                <div className="space-y-4">
                    <NumberedStep number={1}>
                        If something is a horse, then it&quot;s also an animal (given premise)
                    </NumberedStep>

                    <NumberedStep number={2}>
                        If we assume there&quot;s a head of a horse that is NOT the head of an animal, we get a contradiction
                    </NumberedStep>

                    <NumberedStep number={3}>
                        Since every horse is an animal, the head of that horse is necessarily the head of an animal (the same entity, viewed under different classifications)
                    </NumberedStep>
                </div>

                <InfoBox variant="info" className="mt-6">
                    <p className="text-sm">
                        <strong>The resolution method</strong> successfully demonstrates this logical relationship through
                        systematic contradiction elimination. By assuming the opposite of what we want to prove and
                        deriving a contradiction, we confirm that our original statement must be true.
                    </p>
                </InfoBox>
            </Card>
        </div>
    ) : null
);

// Main Container Component
const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => (
    <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        {children}
    </div>
);

const PageFooter: React.FC<PageFooterProps> = ({ children }) => (
    <div className="text-center mt-8 pt-6 border-t border-gray-200">
        {children}
    </div>
);

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
    id,
    title,
    icon,
    children,
    expandedSections,
    toggleSection
}) => (
    <div className="mb-6">
        <CollapsibleHeader
            title={title}
            icon={icon}
            isExpanded={expandedSections[id as keyof ExpandedSections]}
            onClick={() => toggleSection(id)}
        />
        {children}
    </div>
);

// Main Component
const ResolutionProofDocument: React.FC = () => {
    const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
        problem: true,
        formalize: false,
        clausal: false,
        resolution: false,
        conclusion: false,
        intuitive: false
    });

    const toggleSection = (section: string): void => {
        setExpandedSections((prev: ExpandedSections) => ({
            ...prev,
            [section]: !prev[section as keyof ExpandedSections]
        }));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <PageHeader title='Resolution Proof: "The head of a horse is the head of an animal"'>
                <Divider />
            </PageHeader>

            <CollapsibleSection
                id="problem"
                title="Problem Statement"
                icon={BookOpen}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
            >
                <ProblemStatementSection isExpanded={expandedSections.problem} />
            </CollapsibleSection>

            <CollapsibleSection
                id="formalize"
                title="Step 1: Formalize in First-Order Logic"
                icon={Brain}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
            >
                <FormalizationSection isExpanded={expandedSections.formalize} />
            </CollapsibleSection>

            <CollapsibleSection
                id="clausal"
                title="Step 2: Convert to Clausal Form"
                icon={Brain}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
            >
                <ClausalFormSection isExpanded={expandedSections.clausal} />
            </CollapsibleSection>

            <CollapsibleSection
                id="resolution"
                title="Step 3: Apply Resolution"
                icon={Brain}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
            >
                <ResolutionSection isExpanded={expandedSections.resolution} />
            </CollapsibleSection>

            <CollapsibleSection
                id="conclusion"
                title="Step 4: Conclusion"
                icon={CheckCircle}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
            >
                <ConclusionSection isExpanded={expandedSections.conclusion} />
            </CollapsibleSection>

            <CollapsibleSection
                id="intuitive"
                title="Intuitive Explanation"
                icon={Brain}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
            >
                <IntuitiveSection isExpanded={expandedSections.intuitive} />
            </CollapsibleSection>

            <PageFooter>
                <p className="text-sm text-gray-600">
                    Resolution Theorem Proving • First-Order Logic • Automated Reasoning
                </p>
            </PageFooter>
        </div>
    );
};

export default ResolutionProofDocument;


import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Modal from '../components/Modal';
import ToolCard from '../components/ToolCard';
import { MOCK_CALENDAR_EVENTS, PLATFORM_INFO, STATUS_INFO } from '../constants';
import type { CalendarEvent, Platform, Status, Tool } from '../types';

const CalendarHeader: React.FC<{
    currentDate: Date;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onToday: () => void;
}> = ({ currentDate, onPrevMonth, onNextMonth, onToday }) => (
    <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-primary-text font-serif">
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center gap-2">
            <Button onClick={onToday} variant="secondary" className="w-auto py-2 px-3 text-sm">Today</Button>
            <button onClick={onPrevMonth} className="p-2 rounded-md border border-gray-300 dark:border-secondary-accent hover:bg-gray-100 dark:hover:bg-secondary-accent transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg></button>
            <button onClick={onNextMonth} className="p-2 rounded-md border border-gray-300 dark:border-secondary-accent hover:bg-gray-100 dark:hover:bg-secondary-accent transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg></button>
        </div>
    </div>
);

interface DashboardProps {
    onNavClick: (tool: Tool) => void;
}

const logoDataUri = "data:image/pngbase64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAnVSURBVHhe7Z17bFTHHcc/e+/e1s9uE8emxDGJc7JJSUhSUpJSlqQ2VI0qSdU2qVQlDdWmSqOmrZqqaZOmUdU2bapS2kYFqW2lREVCpG2TEkZCSBgHcRI7jokTx7Fv2957b49zvLc9Bw7swd67vXcPcK+f7A/vPc/z/J7n+c5znucZ+v/t0rVr11avXv3+oUOH5u7fv/+lpaXN3rx580uXLl0J1W8l2bNnz3524sQJ7uTJk8N3796d/cADD4zu3LlzV1RUNDVz5szfP/fcc5Nvvvnm6rFjx6oHDx5857nnnpv77rvvrk2ePLl6zpw5716/fv39999/f/TRRz9qCQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBN4tAjs2Nva3mzdv7j1w4IDz2LFj7c2bN8uPPfbYWQcccMDYDRs2fPXVV1/91tSpU7/11ltvLbh3795bLVu2nF+zZs1lW7Zsufvggw+e9tZbbw0cO3bsrWvXrk1eu3btBw4cOGDt2rU3lixZ8vSjjz76xXfffXfJ6tWr/+3BBx+cvXjx4g/t9u3bj+3fv/9rAwcOfOXSpUtPHjp0aM2+ffsWr169ut+8efNnpaWlf2sLhG5ev379rVu3bnXduXNn8wMPPPAf//jHPzY//fTTjzzwwAObN2/ePPD++++v6d+/f83SpUtvWb9+/f1PP/30pVmzZm1asWLFH61btw796quvbt6/f/+1o0ePfn7y5MkbBg8efPH8+fM/dOfOnQ/t3Llzw/jx43+2atXqzzZs2PBLp06d+q5169Yvbtq0qfKrr7760qFDh5asX7/+PQsWLPi3DRs2/OXtt9++uGnTpqf+8MMPZ/39739/+oEHHnjg+vXrP75p06b25s2bf2vdunUvLV68+Fdr164dNnv27K2TJk16euzYsb1ff/315d9++23L/v37H9uzZ89bN23a9GPDhg2bXLhw4at+fn5WlpaWtq1Zs+bl5cuX//zZZ5/9y+XLl78M1W/yHHLIIXv/+c9/bjhw4MBP9+/f/5OZmbl1xIgRk/ft2/ftxx57bPD8+fM/uHz58l+WLFmy8u3bt1+zfft29cMPP7wycuTIp1euXJn405/+tPLzzz/vGjVq1M+vXLnyd7t27erfvXt39x///Of1vXv33jpz5syF8fHxP3jhwoXbN23aVPjwww+vGTJkyCefffZZ609/+tPGOXPm3L9q1avXr12/fv2qTZs2bTtx4sTXN2/efH3JkiX1O3bs2HrOnDl3LFq0aMeCBQs+WbFixaOVK1deP2bMmD/27Nlz88CBA3f27dt39dq1ay/evn37qjVr1vxg+/bt754+fXrrvHnzXjxy5MgpW7ZseW7p0qVXL1my5NW5c+c2LFiw4IMdO3bcWLhw4Wdr165duG3bto+OHz++b8mSJTfu37//VfPnz2+3YsWK961YsaLXihUrzp07d+7xRQsWLHj4+eef3z1+/PifhYWFbVi1alXl6tWrP7x169YPn3nmmd898MADv7t9+/b3lixZ8vTSpUs/WbJkyQtvvfXWbcuXL3/mueee+9fr1q0//d57771s7NixrXv37r1x7Njx/9m0adOrN27c+NyECRN+37Rp07927Njx5+bOndtixIgRpzZv3vzcmDFjlq1ZsyZ39913X7x+/fobN2zY8L3Ro0d/s3HjxoWbNm16/sILL/y92bNnv3bBggVfXbdu3UszZ84c8s9//vO7zZo1a3vkyJE/P/3001v37t17Y82aNWfu3bv36vz58++fOXPmxJ9//vnrdevW/fCJJ5548Zlnnln57rvv/nf79u2rTp069d/Tp0//fMeOHQvj4+Ovu3nz5l1bt2599qmnnnrh+vXrb9mwYcN7Ro4c+aPffvvtzdu2bXsutGjR4ve2bNly90033XR1wYIF3y9YsOCLgwcP3nvLLbe8vnr16i+GDBlSe/Xq1W+OHz++Z+fOnc9evXr1m1u2bLk7cODA7VOnTj0xevToc4YPH9558uTJ1zZt2tS4Zs2azb/++uubVq5c+au1a9fOnT59esPGjRunTJkyZaC/v//tixcv/t+dO3fuHDhw4O6FCxdumT59eueXX3555Y033rhiwoQJH167du1H6tSp833nnXf+dfTo0T8cO3Zsz759+965bNmyk+fPn3/hww8/vGLGjBnrL7roops2bdq0e8KECR/v3bv3+vr16/fVq1cvefTRR79x7733nnX69OlPffHFF5/o379/119++eUnLVu2/H78+PG/+/DDD1dNmDDh4w0bNtzy1ltv/b1Lly793fXr11/dtGnTa0eOHPlj3Lhxvx4xYsS5Q4cOvXvy5MmTJ0+eXDx69OjPLVu2bH7vvffe1hVXXHHZBx544GfDhw9vWbdu3Y8OHTrUOGLEiEmLFi3619ixY/fv3r17t/Hjxy/ftm3bPr158+Z1zz333Isvvvji3B/+8Icbb7755g+aNm3avGXLll/t3Lnz/ZkzZz7v2rXr+z179pxz6dKlN8+fP/+GZ5555hcf3vW/jWl/13593b4fbbjBqXlG/O3H1dXr7aA7N9H/G9O+97k7aA6Oq8c/+5v9/6+7L/5xU83G/+10+v+tX1/d+vV1++b324f/f5/+Tf5rP7oR6v78q1f+r9r9B4YMGfLVvHnzfn344Yc3Tpw48d+5c+deu2TJEhsWL178/y1evPj+zz//vM6BAwf+tHnz5r1Tp04dOXny5Hvnzp07Fy5cuDBs2LAh8f7773+vVatW/enDDz+8adOmTYuXLFny6wMHDnzv2WefvWrUqFHfP/HEE58YNWrUZ/74xz9u+f3333dv3779+h/96Efvv+qqqy4+8MADp//www+P7Ny586Vhw4b9evv27d+cP3/+jStWrFjxzJkz5w4YMGDAgwcP/t2sWbN+OG/e/H3Dhw9/+oMPPrjkwQcf/J1VV111/dixY/d9++23H+zatetrP/3pTz/ZsWPHvZs2bfpX586dWzZt2rT6ySef/Hvbtm2rpk6d+oN+/fr9cO7cubt27dr1u3Xr1l9t2LDhr9OmTfszbdq0T+vXr//l7NmzW2fPnl168sknb1+zZs3tN998822DBw9+ePPmzS/v3bv319u3b3/2kEMOuW39+vVf+uijjy7YsWPH/YMHD161du3aVz7zzDP/u3bt2r985plnXtx///1/6NSpU7+fN29+0JAhQ77av3//bVu2bLnz7bffvm7BggVfHjFixoqZmZmfLVu2bLlz0aJFb928efNXzz///JWXX375O6NGjfrt9ddf//eKFSsOf/PNNzft2rVr9z/+8Y/7N27c+MGkSZMu+vzzz78wduzYn7t37941b978dZs3b37n4MGD2/v27ft30aJFN125cuX/+d577123cePGx2+//fYPjh8/fmXEiBHnrVu3Ln1u9OjhG19++eW3VqxYcfzbb7+t379/f9/GjRsXrl279tHhw4eXzp49u/LMM8/8/bvvvnvX+PHj754/f36d4cOHL1uzZs2PFi1a9P127drt3LVr12tTp06duGjRosfWrFmzfsOGDft5xYoVzZs3bz4wbdo074EDB2595JFHln7//fff+tRTT63buHHj37/99ts7Nm/efOPVV19duHXr1pc2bNjwy7Fjx/7l9u3bn/z444/3zZ0797379+8/ftGiRR+98MILq5cuXfr9nj17/nz27NlXjx079o1JkyZdsGHDBr+dO3ce+P7776/861//um7ixIn/On78+Dnbbrvt6z7++OM7P/zww1VXXXTR9Vu3bn3i559/3jRmzJj3zp07t7/00kvXfPfdd3f/9re/vWL69Onf++CDD244fPjwWcuWLfsxduzYMzZu3Pjw4sWL/+yee+6Z8/e//335hRdeuGL06NHbvvDCC5d//PHHO7dt23bhzTffvOqDDz649tJLLx0fNWrUnH/7298+MW3atE9vuOGGj23YsOH+VatWnbd06dKftm3b9rePPvpopa1btz5t9OjRRz7zzDNbFyxY8Nv+/fubP/3pT++bM2fOF6tWrfrl1ltvPf/www+3Xn755ZUrV678Yf/+/fNWr1794rPPPvv/Dzjg/1+3bp3/dJLL72w+vXq/c9dd9113dixYw/u3r37/ZkzZy7o379//euvv37Jyy+//N2zzz777C+//HL19u3bnzt27Njvtm3bNn3mmWeuue6663avX7/+5ZdeeumH+fPnL37rrbf+vGLFij9s3Ljx/x89evTvvfbWWwvvvffe66ZNmx7ev3//G88++6x/9erVVzZv3vyejRs3Pr9p06b/++yzzz5ZsWLFO5cuXfpTzZo1+6Fz585N165dG8+cOfPLhQsXfnnXXXdtWrlz5+7e/vXvf3+6cuXKr//+97//feHChdfNnj27cf/+/b98+eWX31+0aNGfH3/88R2XX375O/fv31/3r//9712PPfboW1etWnXuypUrf3To0KH7t2zZ8oNXX311zaJFi364Zs2anw4dOtS0YsWKt99++63fP/vsM3/dtm3btQ8++GDbp59+eqR+/frfHz9+fM0XX3zx3BtvvPGiTz/99M8PP/zwO6NHj37/gw8+WP3qq68+26BBgy6tWLHijeXLl/+uYcOGjWfPnl3csGHDPjp9+vQ3Z8+evX3evPlP9+zZ89qCBQseee655/49f/78u7Zs2fLdtm3b/j9kyJCfXn755Tc2bNjwr/Pnz28eMGDA3yZNmtQ0duzYt65evfq3Xnrppb8vWrRo0/Tp0z+zYcOG77dp0+b3JkyY8OuWLVu+Wrdunf/xxx9vufTSS79dsWLF58aPH3/bggULFj399NNv3LBhwwfDhg178sQTT3ywZcuWP7p37/6zjzzyyA3Tp0//4vPPP7+zZMmSnydOnPi/x48fX7148eK3lixZ8tVLL7105xNPPPHF+fPn3/XBBx/cs2jRovds3779hVOnTn3x5Zdf/uf58+d/t2nTph9NmTIl8sEHH9yyZMmSbzt16tQJzzzzjH/fcccdb9y/f//P9+/ff8HSpUt/tnjx4oXLli179v777//n/vvv/8+2bds+W79+/cMPP/xwc+jQIftWr149fuzYsd+/7LLL3ly0aNF7vvnmm1+uX7/+l/v27Xv3ueee+97SpUs/unr16i+XLFny9ZMnT37l4MGDB2bPnv3cCy+88PuFCxde27hx4/5XX331vB133HHT7rjjjjuWL1/+/PPPP/+vJ5544qLPP/988d577/29du3aN+7fv//vjzzyyH0ffvjh5dOmTfvn/vvv/8LFixc/uXDhwt+WLl36w4ULF/5uxIgRf3zxxRe/2L9///Xnnnvur5ctW/bDmzdv/vuTTz4547XXXrt6/fr1Xw4fPvz5oUOHbnnyySf/04wZM2ZdunTprxYsWPDlAwcO/OXZZ5+dNnjw4N9NmjTpd99+++3Hli1b/n/rrbf++6WXXvpH8eLFV++8885b5s6d+/q1a9cO//jHP66ZN2/+f8ePH3/7pZdeuvSZZ565fPny5bdv2LDh3d9++23vX/7yl+8WLFjwhXfffbfm0KFDf79kyZI31q1b90/r1q3759FHH/3d+fPn35s6deofTp069d2bb755w9SpU99v2bLl7c8//3ydtWvX3ly/fv2b+fPnX9mzZ89vnnvuue8WLlz4+uHDhy9Yvnz5t1esWPGL8fHxN27ZsuVXkydP3jx9+vS3zpw589Jjjz22/bXXXrth5syZ761Zs2bz+eefP7tly5afffXVV1vvu+8+K0+ePPmzzZs3/+XEiRM/aA0EEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQACBNyhw48aNNzds2LDl4MGDt7Zs2XL3xIkTXy9duvTrjRs3bu3cubPXrVu3bjds2PCXnj179rKlp6c/vmbNmku2bt16z5YtW35t69atj6xZs+bvW7ZseWn58uVvLFy48N6HHnrorg0bNlxw9OhRP3jnnXf+vW/fvt9dfPHF165evXpv/fv3v/7222+f98ADDzx8xIgR+w8dOnTHli1b1n399dcfXXHFFReePH/+fOH555+/ZuzYsZ3bt28/9dRTT3118+bNfzpz5swd27dvP7d58+YPZsyYsW7hwoVfDB8+fGzJkiVPLVmy5M+TJk1a9MADD0yZN2/+8g0bNny2atWqL0+fPv3C+fPn3zxlypTl/vvv//a1a9f+6LrrrvvVzJkzR5YuXfq9X3755XkbNmy46Omnn75s0qRJv9q9e/cNzz//fPz+++9//5VXXvnO5cuXL61cuXIHBBBAAAEEEEAAAQQQQAABBN4tBP4H1BvC41/e2zUAAAAASUVORK5CYII="

const Dashboard: React.FC<DashboardProps> = ({ onNavClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<CalendarEvent[]>(MOCK_CALENDAR_EVENTS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    const handleToday = () => setCurrentDate(new Date());

    const openAddModal = (date: Date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const calendarGrid = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const grid: (Date | null)[] = [];
        // Add padding days from previous month
        for (let i = 0; i < firstDayOfMonth; i++) {
            grid.push(null);
        }
        // Add days of the current month
        for (let i = 1; i <= daysInMonth; i++) {
            grid.push(new Date(year, month, i));
        }
        return grid;
    }, [currentDate]);

    const isSameDay = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    const today = new Date();

    return (
        <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in">
            <Header
                title={
                    <div className="flex items-center gap-3">
                        <img src={logoDataUri} alt="ContentCore Logo" className="h-12 w-12" />
                        <span>ContentCore</span>
                    </div>
                }
                subtitle="Your marketing command center. Create content and visualize your strategy."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ToolCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>}
                    title="Ad Creative Generator"
                    description="Transform product photos into stunning, styled ad images and videos using generative AI."
                    buttonText="Create Ad ✨"
                    onButtonClick={() => onNavClick('ad-generator')}
                    colorScheme="purple"
                />
                <ToolCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>}
                    title="Social Post Writer"
                    description="Generate engaging social media posts, from short tweets to full blog articles, in any tone."
                    buttonText="Write Post ✍️"
                    onButtonClick={() => onNavClick('social-posts')}
                    colorScheme="blue"
                />
                 <ToolCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>}
                    title="GBP Optimizer"
                    description="Generate compelling, SEO-friendly descriptions for your business and services to improve local search visibility."
                    buttonText="Optimize GBP 📈"
                    onButtonClick={() => onNavClick('gbp-optimizer')}
                    colorScheme="green"
                />
            </div>

            <div className="p-6 bg-white dark:bg-background border border-gray-200 dark:border-secondary-accent rounded-xl">
                <CalendarHeader currentDate={currentDate} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} onToday={handleToday} />
                <div className="grid grid-cols-7 gap-px bg-gray-300 dark:bg-secondary-accent border border-gray-300 dark:border-secondary-accent rounded-lg overflow-hidden">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-xs font-semibold text-gray-700 dark:text-secondary-text py-3 bg-white dark:bg-background">
                            {day}
                        </div>
                    ))}
                    {calendarGrid.map((date, index) => {
                        const isToday = date && isSameDay(date, today);
                        const eventsForDay = date ? events.filter(e => isSameDay(e.date, date)) : [];
                        return (
                            <div
                                key={index}
                                onClick={() => date && openAddModal(date)}
                                className="relative bg-white dark:bg-background min-h-[120px] p-2 flex flex-col group hover:bg-gray-100/50 dark:hover:bg-secondary-accent/50 transition-colors duration-200 cursor-pointer"
                            >
                                {date && (
                                    <>
                                        <time dateTime={date.toISOString()} className={`text-sm font-semibold transition-all duration-200 ${isToday ? 'bg-accent text-white dark:text-background rounded-full flex items-center justify-center h-7 w-7' : 'text-gray-900 dark:text-primary-text group-hover:scale-110'}`}>
                                            {date.getDate()}
                                        </time>
                                        <div className="flex-grow mt-1 space-y-1 overflow-y-auto">
                                            {eventsForDay.map(event => (
                                                <div key={event.id} className={`text-xs p-1.5 rounded-md ${PLATFORM_INFO[event.platform].color}`}>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className={`h-2 w-2 rounded-full ${STATUS_INFO[event.status].color} flex-shrink-0`}></span>
                                                        <span className={`truncate font-medium ${PLATFORM_INFO[event.platform].textColor}`}>{event.title}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button onClick={(e) => { e.stopPropagation(); openAddModal(date); }} className="absolute top-2 right-2 h-6 w-6 rounded-full bg-gray-900 text-white dark:bg-primary-accent dark:text-background items-center justify-center opacity-0 group-hover:opacity-100 hidden sm:flex transition-opacity" aria-label="Add event">
                                           +
                                        </button>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Add Post for ${selectedDate?.toLocaleDateString()}`}>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-600 dark:text-secondary-text mb-1">Title</label>
                        <input type="text" id="title" placeholder="e.g., Weekly product update" className="w-full p-3 bg-white dark:bg-background border border-gray-300 dark:border-secondary-accent text-gray-900 dark:text-primary-text rounded-lg focus:ring-2 focus:ring-accent focus:border-accent" />
                    </div>
                    <div>
                        <label htmlFor="platform" className="block text-sm font-medium text-gray-600 dark:text-secondary-text mb-1">Platform</label>
                        <select id="platform" className="w-full p-3 bg-white dark:bg-background border border-gray-300 dark:border-secondary-accent text-gray-900 dark:text-primary-text rounded-lg focus:ring-2 focus:ring-accent focus:border-accent appearance-none">
                           {Object.keys(PLATFORM_INFO).map(p => <option key={p}>{p}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-600 dark:text-secondary-text mb-1">Status</label>
                        <select id="status" className="w-full p-3 bg-white dark:bg-background border border-gray-300 dark:border-secondary-accent text-gray-900 dark:text-primary-text rounded-lg focus:ring-2 focus:ring-accent focus:border-accent appearance-none">
                           {Object.keys(STATUS_INFO).map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="pt-2">
                        <Button type="button" onClick={() => setIsModalOpen(false)}>Save Post</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Dashboard;
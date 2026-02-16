import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button, Input } from './ui';

export const CreateProposal: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Card className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Create Proposal</h3>
            <div className="space-y-4">
                <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1.5 block">Title</label>
                    <Input
                        placeholder="Introduce a new strategy..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1.5 block">Description</label>
                    <textarea
                        className="w-full px-4 py-2 bg-[var(--input)] border border-[var(--border)] rounded-lg text-sm transition-all focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none placeholder:text-[var(--muted-foreground)]/50 min-h-[100px] resize-none"
                        placeholder="Details about the proposal..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <Button className="w-full h-11 !font-bold">Publish to Arcium</Button>
            </div>
        </Card>
    );
};

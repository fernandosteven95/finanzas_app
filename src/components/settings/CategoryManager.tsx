"use client";

import { addCategory, deleteCategory } from "@/lib/actions";
import { Trash2, Plus, ChevronDown, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import EmojiPicker, { EmojiStyle, Theme } from 'emoji-picker-react';

// Simple Emoji Picker Component to clean up main code
function EmojiSelector({ name = "icon", initial = "🏷️" }: { name?: string, initial?: string }) {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(initial);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setShowPicker(!showPicker)}
                className="w-12 h-10 bg-zinc-950 rounded-lg flex items-center justify-center text-xl hover:bg-zinc-900 transition-colors"
            >
                {selectedEmoji}
            </button>
            <input type="hidden" name={name} value={selectedEmoji} />

            {showPicker && (
                <div className="absolute top-12 left-0 z-50 shadow-2xl rounded-xl border border-zinc-700/50">
                    <div className="fixed inset-0 z-40" onClick={() => setShowPicker(false)}></div>
                    <div className="relative z-50">
                        <EmojiPicker
                            onEmojiClick={(emoji) => {
                                setSelectedEmoji(emoji.emoji);
                                setShowPicker(false);
                            }}
                            theme={Theme.DARK}
                            emojiStyle={EmojiStyle.NATIVE}
                            lazyLoadEmojis={true}
                            width={300}
                            height={400}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function CategoryForm({
    parentId,
    onCancel,
    defaultType
}: {
    parentId?: string,
    onCancel: () => void,
    defaultType?: "INCOME" | "EXPENSE"
}) {
    return (
        <form
            action={async (formData) => {
                if (parentId) formData.append("parentId", parentId);
                await addCategory(formData);
                onCancel();
            }}
            className="bg-zinc-800/80 p-3 rounded-xl flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 border border-zinc-700/50"
        >
            <EmojiSelector />
            <input name="name" placeholder={parentId ? "Subcategoría..." : "Nombre categoría..."} className="flex-1 bg-zinc-950 rounded-lg px-3 text-sm" required autoFocus />

            {/* Can only select type for parent categories */}
            {!parentId ? (
                <select name="type" className="bg-zinc-950 rounded-lg px-2 text-xs h-10">
                    <option value="EXPENSE">Gasto</option>
                    <option value="INCOME">Ingreso</option>
                </select>
            ) : (
                <input type="hidden" name="type" value={defaultType} />
            )}

            <button type="submit" className="bg-emerald-500 text-black px-3 rounded-lg text-sm font-bold hover:bg-emerald-400 transition-colors">OK</button>
            <button type="button" onClick={onCancel} className="bg-zinc-700 text-zinc-300 px-2 rounded-lg hover:bg-zinc-600 transition-colors">
                <X className="h-4 w-4" />
            </button>
        </form>
    );
}

function CategoryItem({ category }: { category: any }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAddingSub, setIsAddingSub] = useState(false);

    const hasChildren = category.children && category.children.length > 0;

    return (
        <div className="select-none">
            {/* Parent Row */}
            <div className="flex items-center justify-between p-3 bg-zinc-900/30 border border-zinc-800/50 rounded-xl hover:bg-zinc-800/50 transition-colors group mb-1">
                <div
                    className="flex items-center gap-3 flex-1 cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center justify-center w-5 h-5 text-zinc-500">
                        {hasChildren || isAddingSub ? (
                            isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                        ) : <div className="w-4" />} {/* Spacer */}
                    </div>

                    <span className="text-xl">{category.icon || "🏷️"}</span>
                    <span className="text-zinc-200 font-medium">{category.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ml-2 ${category.type === 'INCOME' ? 'border-emerald-500/30 text-emerald-500' : 'border-red-500/30 text-red-500'}`}>
                        {category.type === 'INCOME' ? 'Ingreso' : 'Gasto'}
                    </span>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(true);
                            setIsAddingSub(true);
                        }}
                        className="text-zinc-500 hover:text-emerald-400 transition-colors"
                        title="Añadir subcategoría"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                    <form action={deleteCategory.bind(null, category.id)}>
                        <button className="text-zinc-500 hover:text-red-400 transition-colors">
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Children Section */}
            {isExpanded && (
                <div className="pl-10 pr-1 space-y-1 mb-3 border-l-2 border-zinc-800 ml-4">
                    {/* Subcategory List */}
                    {category.children?.map((child: any) => (
                        <div key={child.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800/30 transition-colors group/child">
                            <div className="flex items-center gap-2">
                                <span className="text-base">{child.icon}</span>
                                <span className="text-zinc-400 text-sm">{child.name}</span>
                            </div>
                            <form action={deleteCategory.bind(null, child.id)} className="opacity-0 group-hover/child:opacity-100 transition-opacity">
                                <button className="text-zinc-600 hover:text-red-400">
                                    <Trash2 className="h-3 w-3" />
                                </button>
                            </form>
                        </div>
                    ))}

                    {/* Add Subcategory Form */}
                    {isAddingSub && (
                        <div className="pt-1">
                            <CategoryForm
                                parentId={category.id}
                                defaultType={category.type}
                                onCancel={() => setIsAddingSub(false)}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export function CategoryManager({ categories }: { categories: any[] }) {
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between sticky top-0 bg-[#0A0A0A] z-10 py-2">
                <h3 className="text-zinc-400 text-sm font-medium">Categorías / Etiquetas</h3>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                    <Plus className="h-3.5 w-3.5" /> Nueva Categoría
                </button>
            </div>

            {isAdding && (
                <div className="mb-4">
                    <CategoryForm onCancel={() => setIsAdding(false)} />
                </div>
            )}

            <div className="space-y-1 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar pb-20">
                {categories.length === 0 ? (
                    <div className="text-center py-10 text-zinc-600 italic text-sm">No hay categorías. Crea una arriba.</div>
                ) : (
                    categories.map((cat) => (
                        <CategoryItem key={cat.id} category={cat} />
                    ))
                )}
            </div>
        </div>
    );
}

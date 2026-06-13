'use client';

import { Ban, Check, Eye, MessageCircle, Pencil, Trash2, X } from 'lucide-react';
import Link from 'next/link';

/**
 * @component DynamicTableActions
 * @description A highly reusable action bar component for tables, lists, or cards.
 * It intelligently switches between Next.js <Link> and standard <button> based on the presence of an 'href' prop.
 * * @param {DynamicTableActionsProps} props - The actions array containing configuration for each button/link.
 * * @example
 * // Basic usage with default labels and icons
 * <DynamicTableActions actions={[{ type: 'edit', onClick: handleEdit }]} />
 * * // Usage as a Next.js Link with a custom label
 * <DynamicTableActions actions={[{ type: 'view', label: 'View Profile', href: '/profile/123' }]} />
 * * // Multiple actions with mixed types
 * <DynamicTableActions actions={[
 * { type: 'save', onClick: handleSave },
 * { type: 'suspend', onClick: () => handleSuspend(id), className: 'opacity-50' }
 * ]} />
 */

export type ActionType = 'edit' | 'delete' | 'view' | 'save' | 'close' | 'suspend' | 'message';

interface ActionItem {
  type: ActionType;
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

interface DynamicTableActionsProps {
  actions: ActionItem[];
}

const DynamicTableActions = ({ actions }: DynamicTableActionsProps) => {
  //   Internal configuration map for action aesthetics.
  const iconMap = {
    edit: {
      icon: Pencil,
      defaultLabel: 'Edit',
      color: '#34796f',
    },
    delete: {
      icon: Trash2,
      defaultLabel: 'Delete',
      color: '#dc3545',
    },
    view: {
      icon: Eye,
      defaultLabel: 'View',
      color: '#64748b',
    },
    save: {
      icon: Check,
      defaultLabel: 'Save',
      color: '#28a745',
    },
    close: {
      icon: X,
      defaultLabel: 'Cancel',
      color: '#64748b',
    },
    suspend: {
      icon: Ban,
      defaultLabel: 'Suspend',
      color: '#dc3545',
    },
    message: {
      icon: MessageCircle,
      defaultLabel: 'Message',
      color: '#34796f',
    },
  };

  return (
    <div className="flex items-center gap-2">
      {actions.map((action, index) => {
        const config = iconMap[action.type];

        // Fallback for safety if an unsupported action type is passed
        if (!config) return null;

        const Icon = config.icon;

        /**
         * Dynamic styling logic:
         * - Background: 10% opacity (2A)
         * - Border: 20% opacity (33)
         */
        const dynamicStyle = {
          color: config.color,
          backgroundColor: `${config.color}2A`,
          borderColor: `${config.color}33`,
        };

        const commonClass = `group flex items-center gap-1.5 px-3 py-1.5 rounded cursor-pointer border text-xs font-medium transition-all hover:brightness-110 active:scale-95 ${action.className}`;

        // Fragment to avoid redundant code in Link and Button
        const content = (
          <>
            <Icon size={14} className="transition-transform group-hover:scale-110" />
            <span>{action.label || config.defaultLabel}</span>
          </>
        );

        // Render as Next.js Link if href is present
        if (action.href) {
          return (
            <Link key={index} href={action.href} className={commonClass} style={dynamicStyle}>
              {content}
            </Link>
          );
        }

        // Render as a Button if no href is provided
        return (
          <button
            key={index}
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Prevents triggering row clicks if used inside a table
              action.onClick?.();
            }}
            className={commonClass}
            style={dynamicStyle}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};

export default DynamicTableActions;

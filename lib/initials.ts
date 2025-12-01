/**
 * Generates unique 2-letter initials for player avatars
 * Logic:
 * 1. If has surname: first letter of name + first letter of surname (e.g., Diego Salles → DS)
 * 2. If no surname: first 2 letters of name (e.g., Diego → DI)
 * 3. If conflict exists: use next available letter combination
 */

export function generateInitials(name: string, allNames: string[] = []): string {
    if (!name || name.trim().length === 0) return "??"

    const trimmedName = name.trim()

    // Build a set of all used initials from other names
    const usedInitials = new Set<string>()

    allNames.forEach(otherName => {
        if (otherName !== name && otherName.trim()) {
            // Generate the primary initials for this other name
            const initials = getPrimaryInitials(otherName.trim())
            usedInitials.add(initials)
        }
    })

    // Generate initials for the current name, checking for conflicts
    return generateWithConflictResolution(trimmedName, usedInitials)
}

function getPrimaryInitials(name: string): string {
    const words = name.split(/\s+/).filter(w => w.length > 0)

    // Case 1: Has surname - use first letter of first name + first letter of surname
    if (words.length >= 2) {
        const firstInitial = words[0][0].toUpperCase()
        const lastInitial = words[words.length - 1][0].toUpperCase()
        return firstInitial + lastInitial
    }

    // Case 2: Single name - use first 2 letters
    if (words[0].length >= 2) {
        return words[0].substring(0, 2).toUpperCase()
    }

    // Edge case: name has only 1 letter
    return (words[0][0] + words[0][0]).toUpperCase()
}

function generateWithConflictResolution(name: string, usedInitials: Set<string>): string {
    const words = name.split(/\s+/).filter(w => w.length > 0)

    // First, try the primary/standard approach
    const primary = getPrimaryInitials(name)
    if (!usedInitials.has(primary)) {
        return primary
    }

    // If there's a conflict, try alternative combinations
    // For names with surname, try: first 2 letters of first name
    if (words.length >= 2 && words[0].length >= 2) {
        const alt1 = words[0].substring(0, 2).toUpperCase()
        if (!usedInitials.has(alt1)) {
            return alt1
        }
    }

    // For single names or still conflicting: try first letter + third letter
    const mainName = words[0]
    if (mainName.length >= 3) {
        const alt2 = (mainName[0] + mainName[2]).toUpperCase()
        if (!usedInitials.has(alt2)) {
            return alt2
        }
    }

    // Try first letter + fourth letter
    if (mainName.length >= 4) {
        const alt3 = (mainName[0] + mainName[3]).toUpperCase()
        if (!usedInitials.has(alt3)) {
            return alt3
        }
    }

    // Try second + third letter
    if (mainName.length >= 3) {
        const alt4 = mainName.substring(1, 3).toUpperCase()
        if (!usedInitials.has(alt4)) {
            return alt4
        }
    }

    // Last resort: use the primary initials even if duplicate
    return primary
}

// Helper function to get initials for a single name without checking conflicts
// Useful for display purposes when you don't have access to all names
export function getSimpleInitials(name: string): string {
    if (!name || name.trim().length === 0) return "??"

    return getPrimaryInitials(name.trim())
}

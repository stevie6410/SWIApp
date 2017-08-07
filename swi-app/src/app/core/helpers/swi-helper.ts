import { SWIHeader, SWIStageGroup } from "app/core";

export function recalculateStageSequences(group: SWIStageGroup) {
    //First sort the stages by seqence number
    group.stages.sort((a, b) => a.sequence - b.sequence);
    //Now re-sequence based on list position
    for (var i = 0; i < group.stages.length; i++) {
        var element = group.stages[i];
        element.sequence = i + 1;
    }
}

export function recalculateGroupSequences(swi: SWIHeader) {
    for (var i = 0; i < swi.stageGroups.length; i++) {
        var element = swi.stageGroups[i];
        element.sequence = i + 1;
    }
}
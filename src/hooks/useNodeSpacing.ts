import { useCallback } from 'react';
import { Node, useReactFlow, useStore } from 'reactflow';
import { NodeData } from '../types/flow';

const MIN_DISTANCE = 100;

export const useNodeSpacing = () => {
  const { getNodes, setNodes } = useReactFlow();
  const transform = useStore((state) => state.transform);

  const recalculateNodePositions = useCallback((expandedNodeId: string) => {
    const nodes = getNodes();
    const expandedNode = nodes.find((n) => n.id === expandedNodeId);
    if (!expandedNode) return;

    const zoom = transform[2];
    const spacing = MIN_DISTANCE * (1 / zoom);

    const updatedNodes = nodes.reduce<Node<NodeData>[]>((acc, node) => {
      if (node.id === expandedNodeId) {
        acc.push(node);
        return acc;
      }

      const nodeRect = {
        left: node.position.x,
        right: node.position.x + (node.width || 200),
        top: node.position.y,
        bottom: node.position.y + (node.height || 100),
      };

      const expandedRect = {
        left: expandedNode.position.x,
        right: expandedNode.position.x + (expandedNode.width || 400),
        top: expandedNode.position.y,
        bottom: expandedNode.position.y + (expandedNode.height || 100),
      };

      const horizontalOverlap =
        nodeRect.left < expandedRect.right + spacing &&
        nodeRect.right > expandedRect.left - spacing;
      const verticalOverlap =
        nodeRect.top < expandedRect.bottom + spacing &&
        nodeRect.bottom > expandedRect.top - spacing;

      if (horizontalOverlap || verticalOverlap) {
        const xOffset = horizontalOverlap ? expandedRect.right - nodeRect.left + spacing : 0;
        const yOffset = verticalOverlap ? expandedRect.bottom - nodeRect.top + spacing : 0;

        acc.push({
          ...node,
          position: {
            x: node.position.x + (xOffset > 0 ? xOffset : 0),
            y: node.position.y + (yOffset > 0 ? yOffset : 0),
          },
        });
      } else {
        acc.push(node);
      }

      return acc;
    }, []);

    setNodes(updatedNodes);
  }, [getNodes, setNodes, transform]);

  return { recalculateNodePositions };
};
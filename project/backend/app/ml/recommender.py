import random
from typing import List, Dict, Any

class ReliefRecommender:
    def __init__(self):
        self.actions = {
            'hydration': {
                'type': 'hydration',
                'description': 'Drink 500ml of water',
                'evidence_level': 'high',
                'effectiveness': 0.3,
                'contraindications': []
            },
            'heat_pad': {
                'type': 'heat_pad',
                'description': 'Apply heat pad for 15-20 minutes',
                'evidence_level': 'high', 
                'effectiveness': 0.4,
                'contraindications': ['skin_sensitivity']
            },
            'gentle_stretching': {
                'type': 'exercise',
                'description': 'Gentle pelvic stretches',
                'evidence_level': 'medium',
                'effectiveness': 0.35,
                'contraindications': ['acute_pain']
            },
            'magnesium_foods': {
                'type': 'dietary',
                'description': 'Foods rich in magnesium (nuts, leafy greens)',
                'evidence_level': 'medium',
                'effectiveness': 0.25,
                'contraindications': []
            },
            'breathing_exercise': {
                'type': 'mind_body',
                'description': 'Deep breathing for 5 minutes',
                'evidence_level': 'medium',
                'effectiveness': 0.3,
                'contraindications': []
            },
            'rest': {
                'type': 'rest',
                'description': 'Take a 20-minute rest break',
                'evidence_level': 'high',
                'effectiveness': 0.35,
                'contraindications': []
            }
        }
    
    def get_recommendations(self, user_id: str, prediction_data: Dict, user_context: Dict = None) -> List[Dict]:
        """Get personalized recommendations"""
        user_context = user_context or {}
        
        # Filter safe actions
        safe_actions = self._filter_safe_actions(user_context)
        
        # Personalize based on prediction and user history
        personalized = self._personalize_actions(safe_actions, prediction_data, user_id)
        
        # Return top 3 recommendations
        return personalized[:3]
    
    def _filter_safe_actions(self, user_context: Dict) -> List[Dict]:
        """Filter out contraindicated actions"""
        safe_actions = []
        
        for action_name, action in self.actions.items():
            safe = True
            for contraindication in action['contraindications']:
                if user_context.get(contraindication, False):
                    safe = False
                    break
            
            if safe:
                safe_actions.append({**action, 'name': action_name})
        
        return safe_actions
    
    def _personalize_actions(self, actions: List[Dict], prediction: Dict, user_id: str) -> List[Dict]:
        """Personalize action ranking"""
        pain_level = prediction['predicted_pain']
        
        # Score actions based on pain level and type
        scored_actions = []
        for action in actions:
            score = action['effectiveness']
            
            # Adjust scores based on pain level
            if pain_level >= 7:  # Severe pain
                if action['type'] in ['heat_pad', 'rest']:
                    score *= 1.3
                elif action['type'] in ['gentle_stretching']:
                    score *= 0.7
            elif pain_level <= 3:  # Mild pain
                if action['type'] in ['exercise', 'hydration']:
                    score *= 1.2
            
            # Add some randomness for exploration
            score *= random.uniform(0.9, 1.1)
            
            # Add explanation
            explanation = self._get_explanation(action, pain_level)
            
            scored_actions.append({
                **action,
                'personal_score': round(score, 3),
                'explanation': explanation,
                'confidence': 'medium'  # Could be based on user feedback history
            })
        
        # Sort by score
        scored_actions.sort(key=lambda x: x['personal_score'], reverse=True)
        return scored_actions
    
    def _get_explanation(self, action: Dict, pain_level: float) -> str:
        """Generate explanation for recommendation"""
        explanations = {
            'hydration': "Hydration helps reduce bloating and muscle cramps.",
            'heat_pad': "Heat relaxes uterine muscles and increases blood flow.",
            'gentle_stretching': "Stretching can relieve muscle tension and improve circulation.",
            'magnesium_foods': "Magnesium helps relax muscles and may reduce cramping.",
            'breathing_exercise': "Deep breathing reduces stress and can help manage pain perception.",
            'rest': "Rest allows your body to recover and can reduce inflammation."
        }
        
        base_explanation = explanations.get(action['name'], "This may help manage your symptoms.")
        
        if pain_level >= 7:
            return f"{base_explanation} Particularly helpful for severe pain."
        elif pain_level <= 3:
            return f"{base_explanation} Good for maintaining comfort."
        else:
            return base_explanation

# Global instance
recommender = ReliefRecommender()
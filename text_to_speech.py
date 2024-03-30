
class Text_To_Speech:
    #calclue cost of fetch api
    def calculate_cost(text_string, model_id):
        cost_tier = {
            'tts-1': 0.015,
            'tts-1-hd': 0.03
        }
        cost_unit = cost_tier.get(model_id, None)
        if cost_unit is None:
            return None
        return (cost_unit * len(text_string)) / 1000